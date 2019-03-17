from django.urls import path, include, re_path
from Authentication.views import UserListRegistrationAPIView

urlpatterns = [
    re_path(r'^users/$', UserListRegistrationAPIView.as_view()),
]
