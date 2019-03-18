from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from Profiles.serializers import ProfileSerializer
from Profiles.models import Profile

class ProfilesRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    permissions_classes = (AllowAny,)
    queryset = Profile.objects.select_related('user')
    serializer_class = ProfileSerializer

    def retrieve(self, request, user_id, *args, **kwargs):
        profile = self.get_queryset().get(user__id=user_id)
        serializer = self.serializer_class(profile)
        return Response(serializer.data, status.HTTP_200_OK)

    def update(self, request, user_id, *args, **kwargs):
        profile = self.get_queryset().get(user__id=user_id)
        updated_profile = request.data
        serializer = self.serializer_class(profile, data=updated_profile)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status.HTTP_200_OK)
