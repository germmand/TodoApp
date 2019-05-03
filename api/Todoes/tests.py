from rest_framework import status
from rest_framework.test import APITestCase
from django.urls import reverse

from Authentication.models import User
from Profiles.models import Profile
from Todoes.models import (
    TodoBoard, 
    TodoStatus, 
    Todo
)

def create_profile(**kwargs):
    profile_data = {
        'bio': kwargs.get('bio', 'dummy profile bio'),
        'first_name': kwargs.get('first_name', 'dummy first name'),
        'last_name': kwargs.get('last_name', 'dummy last name'),
    }
    user_data = {
        'username': kwargs.get('username', 'DummyUser'),
        'email': kwargs.get('email', 'dummy@email.com'),
        'password': kwargs.get('password', 'supperpassword123'),
    }
    user = User.objects.create(**user_data)
    profile = Profile(**profile_data)
    profile.user = user
    profile.save()
    return profile

def create_board(**kwargs):
    profile = create_profile(**kwargs)
    board = TodoBoard(title=kwargs.get('board_title', 'dummy title'))
    board.profile = profile
    board.save()
    return board

def create_todo_statuses(**kwargs):
    return [TodoStatus.objects.create(status_name='To Do'),
            TodoStatus.objects.create(status_name='Doing'),
            TodoStatus.objects.create(status_name='Done')]

def create_todo(**kwargs):
    status = create_todo_statuses()[0]
    board = create_board(**kwargs)
    todo = Todo(title=kwargs.get('todo_title', 'dummy todo title'),
                body=kwargs.get('todo_body', 'dummy todo body'))
    todo.board = board
    todo.status = status
    todo.save()
    return todo

class TodoBoardViewSetTests(APITestCase):
    def test_create_board_to_user_successfully(self):
        url = reverse('board-list')
        profile = create_profile(username='test_user')
        self.client.force_authenticate(user=profile.user)
        board_data = {
            'title': 'dummy board name'
        }
        response = self.client.post(url, board_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(TodoBoard.objects.count(), 1)
        self.assertEqual(TodoBoard.objects.get().title, board_data['title'])
        self.assertEqual(
            TodoBoard.objects.get().profile.user.username, 
            profile.user.username)

    def test_allow_board_editing_if_owner(self):
        board = create_board(board_title='my board title')
        url = reverse('board-detail', kwargs={
            'pk': 1
        }) 
        owner = board.profile.user
        self.client.force_authenticate(user=owner)
        new_board_data = {
            'title': 'my dummy updated title'
        }
        response = self.client.patch(url, new_board_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(TodoBoard.objects.get().title, new_board_data['title'])

    def test_does_not_allow_board_editing_if_not_owner(self):
        board = create_board(board_title='my board title')
        url = reverse('board-detail', kwargs={
            'pk': 1
        }) 
        other_user_data = {
            'username': 'any_other_user',
            'email': 'other_user@email.com',
            'password': 'greatersuperpassword123'
        }
        other_user_profile = create_profile(**other_user_data)
        requester = other_user_profile.user
        self.client.force_authenticate(user=requester)
        new_board_data = {
            'title': 'my dummy updated title'
        }
        response = self.client.patch(url, new_board_data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

class TodoListCreateAPIViewTests(APITestCase):
    def test_create_todo_successfully_if_board_owner(self):
        create_todo_statuses()
        board = create_board(board_title='my dummy board title')
        owner = board.profile.user
        self.client.force_authenticate(user=owner)
        url = reverse('todo-list', kwargs={
            'board_id': 1
        })
        new_todo_data = {
            'title': 'dummy todo title',
            'body': 'dummy todo body'
        }
        response = self.client.post(url, new_todo_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(board.todoes.count(), 1)
        self.assertEqual(board.todoes.get().title, new_todo_data['title'])

    def test_doest_not_create_todo_if_not_board_owner(self):
        create_todo_statuses()
        board = create_board(board_title='my dummy board title')
        other_user_data = {
            'username': 'any_other_user',
            'email': 'other_user@email.com',
            'password': 'greatersuperpassword123'
        }
        other_user_profile = create_profile(**other_user_data)
        requester = other_user_profile.user
        self.client.force_authenticate(user=requester)
        url = reverse('todo-list', kwargs={
            'board_id': 1
        })
        new_todo_data = {
            'title': 'dummy todo title',
            'body': 'dummy todo body'
        }
        response = self.client.post(url, new_todo_data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_return_list_of_todoes_successfully(self):
        todo = create_todo(todo_title='my first dummy todo tittle')
        board = todo.board
        owner = board.profile.user
        self.client.force_authenticate(user=owner)
        url = reverse('todo-list', kwargs={
            'board_id': 1
        })
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), board.todoes.count())
        self.assertEqual(response.data[0]['title'], todo.title)

    def test_return_404_on_board_not_found(self):
        todo = create_todo(todo_title='my first dummy todo tittle')
        board = todo.board
        owner = board.profile.user
        self.client.force_authenticate(user=owner)
        url = reverse('todo-list', kwargs={
            'board_id': 99
        })
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

class TodoDetailAPIViewTests(APITestCase):
    def test_get_todo_raises_404_on_board_not_found(self):
        from Todoes.views import TodoDetailAPIView
        from django.http import Http404
        todo_detail = TodoDetailAPIView() 
        todo = create_todo()
        self.assertRaises(Http404,
                          todo_detail.get_todo, 
                          todo.board.id + 1,
                          todo.id)

    def test_get_todo_raises_404_on_todo_not_found(self):
        from Todoes.views import TodoDetailAPIView
        from django.http import Http404
        todo_detail = TodoDetailAPIView() 
        todo = create_todo()
        self.assertRaises(Http404,
                          todo_detail.get_todo, 
                          todo.board.id,
                          todo.id + 1)

    def test_update_todo_successfully_only_if_owner(self):
        todo = create_todo()
        owner = todo.board.profile.user
        self.client.force_authenticate(user=owner)
        new_todo_data = {
            'title': 'new todo title :)'
        }
        url = reverse('todo-detail', kwargs={
            'board_id': 1,
            'todo_id': 1
        })
        response = self.client.patch(url, new_todo_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Todo.objects.get().title, new_todo_data['title'])

    def test_does_not_update_todo_if_not_owner(self):
        todo = create_todo()
        other_user_data = {
            'username': 'any_other_user',
            'email': 'other_user@email.com',
            'password': 'greatersuperpassword123'
        }
        other_user_profile = create_profile(**other_user_data)
        requester = other_user_profile.user
        self.client.force_authenticate(user=requester)
        new_todo_data = {
            'title': 'new todo title :)'
        }
        url = reverse('todo-detail', kwargs={
            'board_id': 1,
            'todo_id': 1
        })
        response = self.client.patch(url, new_todo_data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_destroy_todo_successfully_only_if_owner(self):
        todo = create_todo()
        owner = todo.board.profile.user
        self.client.force_authenticate(user=owner)
        url = reverse('todo-detail', kwargs={
            'board_id': 1,
            'todo_id': 1
        })
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Todo.objects.count(), 0)

    def test_does_not_destroy_todo_if_not_owner(self):
        todo = create_todo()
        other_user_data = {
            'username': 'any_other_user',
            'email': 'other_user@email.com',
            'password': 'greatersuperpassword123'
        }
        other_user_profile = create_profile(**other_user_data)
        requester = other_user_profile.user
        self.client.force_authenticate(user=requester)
        url = reverse('todo-detail', kwargs={
            'board_id': 1,
            'todo_id': 1
        })
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
