from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import (
    viewsets, 
    generics,
    mixins,
    status
)

from Todoes.permissions import (
    IsAdminOrReadOnly, 
    IsOwnerOrReadOnly,
    OnlyOwnerCanAlterBoard
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
    permission_classes = (IsAuthenticated,
                          IsAdminOrReadOnly)
    queryset = TodoStatus.objects.all()
    serializer_class = TodoStatusSerializer

class TodoBoardViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,
                          IsOwnerOrReadOnly)
    queryset = TodoBoard.objects.select_related('profile', 'profile__user')
    serializer_class = TodoBoardSerializer

    def create(self, request, *args, **kwargs):
        board = request.data
        serializer_context = {
            'request': request,
            'profile': request.user.profile
        }
        serializer = self.serializer_class(data=board, context=serializer_context)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def list(self, request, *args, **kwargs):
        id = request.user.id
        boards = self.get_queryset().filter(profile__user__id=id)
        serializer = self.serializer_class(boards, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class TodoListCreateAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,
                          OnlyOwnerCanAlterBoard)
    queryset = Todo.objects.select_related('board')
    serializer_class = TodoSerializer

    def create(self, request, board_id, *args, **kwargs):
        board = TodoBoard.objects.get(id=board_id)
        todo_status = TodoStatus.objects.get(status_name='To Do')
        data = request.data
        serializer_context = {
            'board': board,
            'status': todo_status,
            'request': request
        }
        serializer = self.serializer_class(data=data, context=serializer_context)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def list(self, request, board_id, *args, **kwargs):
        todoes = self.get_queryset().filter(board__id=board_id)
        serializer = self.serializer_class(todoes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
