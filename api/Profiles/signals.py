from django.dispatch import receiver
from django.db.models.signals import post_save
from django.conf import settings

from Authentication.models import User
from Profiles.models import Profile

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_profile_on_user_creation(sender, instance, created, **kwargs):
    if created:
        profile = Profile(user=instance)
        profile.save()
