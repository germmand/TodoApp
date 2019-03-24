from django.urls import re_path, include
from rest_framework import routers

from Todoes.views import (
    TodoStatusesViewSet, 
    TodoBoardViewSet,
    TodoListCreateAPIView
)

statusesRouter = routers.SimpleRouter()
statusesRouter.register(r'statuses', TodoStatusesViewSet)
statusesRouter.register(r'boards', TodoBoardViewSet)

urlpatterns = [
    re_path(r'^', include(statusesRouter.urls)),
    re_path(r'^boards/(?P<board_id>\d+)/todoes', TodoListCreateAPIView.as_view())
]
