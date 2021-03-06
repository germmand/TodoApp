from rest_framework import serializers
from Authentication.models import User

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length=150,
        min_length=8,
        write_only=True
    )
    profile = serializers.PrimaryKeyRelatedField(many=False, read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'profile')

class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length=150,
        min_length=8,
        write_only=True
    )
    
    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
