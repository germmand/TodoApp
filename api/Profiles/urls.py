from django.urls import re_path
from Profiles.views import ProfilesRetrieveUpdateAPIView

urlpatterns = [
    re_path(r'^users/(?P<user_id>\d+)/profile/$', ProfilesRetrieveUpdateAPIView.as_view(), name='profile-detail')
]
