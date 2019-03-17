from rest_framework import serializers
from Authentication.models import User

class UserSerializer(serializers.ModelSerializer):
    boards = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    password = serializers.CharField(
        max_length=150,
        min_length=8,
        write_only=True
    )
    first_name = serializers.CharField(max_length=150, allow_null=True)
    last_name  = serializers.CharField(max_length=150, allow_null=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name', 'boards')

class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length=150,
        min_length=8,
        write_only=True
    )
    first_name = serializers.CharField(max_length=150, allow_null=True)
    last_name  = serializers.CharField(max_length=150, allow_null=True)
    
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'first_name', 'last_name')

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
