from django.shortcuts import render
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
    queryset = TodoStatus.objects.all()
    serializer_class = TodoStatusSerializer
