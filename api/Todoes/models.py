from django.db import models
from django.conf import settings # For getting current active user model.

class TodoStatus(models.Model):
    status_name = models.CharField(max_length=30)

class TodoBoard(models.Model):
    title = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='boards'
    )

class Todo(models.Model):
    title = models.CharField(max_length=50)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    board = models.ForeignKey(
        TodoBoard,
        on_delete=models.CASCADE,
        related_name='todoes'
    )
    status = models.ForeignKey(
        TodoStatus, 
        on_delete=models.CASCADE, 
        related_name='todoes'
    )
