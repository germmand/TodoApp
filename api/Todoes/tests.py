from rest_framework import status
from rest_framework.test import APITestCase
from django.urls import reverse

from Authentication.models import User
from Profiles.models import Profile
from Todoes.models import TodoBoard

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
    board = TodoBoard(title=kwargs.get('title', 'dummy title'))
    board.profile = profile
    board.save()
    return board

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
        board = create_board(title='my board title')
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
        board = create_board(title='my board title')
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
