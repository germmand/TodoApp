from django.shortcuts import render
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from Todoes.permissions import IsAdminOrReadOnly
from rest_framework import (
    viewsets, 
    generics
)

from Todoes.serializers import (
    TodoStatusSerializer,
    TodoBoardSerializer,
    TodoSerializer
)
from Todoes.models import (
    TodoStatus,
    TodoBoard,
    Todo
)

class TodoStatusesViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,
                          IsAdminOrReadOnly,)
    queryset = TodoStatus.objects.all()
    serializer_class = TodoStatusSerializer
