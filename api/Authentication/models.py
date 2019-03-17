from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager
)

class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, first_name=None, last_name=None):
        if not username:
            raise ValueError('Users must have an username')
        elif not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            username=username,
            first_name=first_name,
            last_name=last_name
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password, first_name=None, last_name=None):
        user = self.create_user(
            username,
            email,
            password,
            first_name,
            last_name
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    # Custom User Fields.
    id = models.AutoField(primary_key=True)
    username = models.CharField(
        verbose_name='Username',
        max_length=100, 
        unique=True
    )
    email = models.EmailField(
        verbose_name='Email Address',
        max_length=255,
        unique=True
    )
    first_name = models.CharField(max_length=150, null=True)
    last_name  = models.CharField(max_length=150, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active  = models.BooleanField(default=True)
    is_admin   = models.BooleanField(default=False)

    # Specifying custom manager defined above.
    objects = UserManager()

    # Minimum requirements.
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    @property
    def is_staff(self):
        return self.is_admin
