from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from Authentication.serializers import RegistrationSerializer, UserSerializer
from Authentication.models import User

class UserListRegistrationAPIView(generics.ListCreateAPIView):
    serializer_class = RegistrationSerializer
    permission_classes = (AllowAny,)
    queryset = User.objects.all()

    def create(self, request, *args, **kwargs):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def list(self, request, *args, **kwargs):
        serializer = UserSerializer(self.get_queryset(), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
