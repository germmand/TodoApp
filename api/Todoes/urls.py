from django.urls import re_path, include
from rest_framework import routers

from Todoes.views import (
    TodoStatusesViewSet, 
    TodoBoardViewSet,
)

statusesRouter = routers.SimpleRouter()
statusesRouter.register(r'statuses', TodoStatusesViewSet)
statusesRouter.register(r'boards', TodoBoardViewSet)

urlpatterns = [
    re_path(r'^', include(statusesRouter.urls)),
]
