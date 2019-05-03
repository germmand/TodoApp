from rest_framework import status
from rest_framework.test import APITestCase
from django.urls import reverse

from Profiles.models import Profile
from Authentication.models import User

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

class ProfilesRetrieveUpdateAPIViewTests(APITestCase):
    def test_retrieve_user_successfully(self):
        profile = create_profile(bio='my custom profile bio')
        url = reverse('profile-detail', kwargs={
            'user_id': 1
        }) 
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['bio'], profile.bio)

    def test_retrieve_404_on_profile_not_found(self):
        url = reverse('profile-detail', kwargs={
            'user_id': 100
        })
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_user_successfully(self):
        profile = create_profile()
        url = reverse('profile-detail', kwargs={
            'user_id': 1
        }) 
        # we only update the bio
        updated_profile_data = {
            'bio': 'updated bio',
            'first_name': profile.first_name,
            'last_name': profile.last_name
        }
        response = self.client.put(url, updated_profile_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['bio'], updated_profile_data['bio'])
        self.assertEqual(Profile.objects.get().bio, updated_profile_data['bio'])

    def test_update_user_not_found(self):
        profile = create_profile()
        url = reverse('profile-detail', kwargs={
            'user_id': 90
        }) 
        # we only update the bio
        updated_profile_data = {
            'bio': 'updated bio',
            'first_name': profile.first_name,
            'last_name': profile.last_name
        }
        response = self.client.put(url, updated_profile_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
