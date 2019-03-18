from django.db import models
from django.conf import settings # For getting current active user

class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='profile',
        primary_key=True,
    )
    bio = models.TextField(blank=True, default='')
    image = models.URLField(blank=True, default='')
    first_name = models.CharField(max_length=150, blank=True, default='')
    last_name  = models.CharField(max_length=150, blank=True, default='')
