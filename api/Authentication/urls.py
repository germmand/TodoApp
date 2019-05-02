from django.urls import re_path
from Authentication.views import UserListRegistrationAPIView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)

urlpatterns = [
    re_path(r'^users/$', UserListRegistrationAPIView.as_view(), name='user-list'),
    re_path(r'^users/authenticate$', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    re_path(r'^users/refresh$', TokenRefreshView.as_view(), name='token_refresh')
]
