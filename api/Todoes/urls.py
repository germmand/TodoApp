from django.urls import re_path, include
from rest_framework import routers

from Todoes.views import (
    TodoStatusesViewSet, 
    TodoBoardViewSet,
    TodoListCreateAPIView,
    TodoDetailAPIView
)

statusesRouter = routers.SimpleRouter()
statusesRouter.register(r'statuses', TodoStatusesViewSet, basename='status')
statusesRouter.register(r'boards', TodoBoardViewSet, basename='board')

urlpatterns = [
    re_path(r'^', include(statusesRouter.urls)),
    re_path(r'^boards/(?P<board_id>\d+)/todoes$', TodoListCreateAPIView.as_view(), name='todo-list'),
    re_path(r'^boards/(?P<board_id>\d+)/todoes/(?P<todo_id>\d+)$', TodoDetailAPIView.as_view(), name='todo-detail')
]
