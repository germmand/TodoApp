from rest_framework import status
from rest_framework.test import APITestCase
from django.urls import reverse

from Authentication.models import User

class UserListRegistrationAPIViewTests(APITestCase):
    def test_return_list_of_users_correctly(self):
        url = reverse('user-list')
        data = {
            'username': 'DummyUser',
            'email': 'dummy@email.com',
            'password': 'superpassword123'
        }
        User.objects.create(**data)
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), User.objects.count())
        self.assertEqual(response.data[0]['username'], User.objects.get().username)

    def test_create_account_successfully(self):
        url = reverse('user-list')
        data = {
            'username': 'DummyUser',
            'email': 'dummy@email.com',
            'password': 'superpassword123'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().username, data['username'])

    def test_return_400_when_user_already_exists(self):
        url = reverse('user-list')
        data = {
            'username': 'DummyUser',
            'email': 'dummy@email.com',
            'password': 'superpassword123'
        }
        User.objects.create(**data)
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
