from rest_framework import serializers
from Todoes.models import (
    TodoStatus,
    TodoBoard,
    Todo
)

class TodoStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoStatus
        fields = ('id', 'status_name')

class TodoBoardSerializer(serializers.ModelSerializer):
    profile = serializers.PrimaryKeyRelatedField(many=False, read_only=True)

    class Meta:
        model = TodoBoard
        fields = ('id', 'title', 'created_at', 'profile')

    def create(self, validated_data):
        profile = self.context.get('profile', None)
        if profile is None:
            raise serializers.ValidationError(
                'No profile provided for this board.'
            )
        board = TodoBoard.objects.create(profile=profile, **validated_data)
        return board

class TodoSerializer(serializers.ModelSerializer):
    board = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    status = serializers.PrimaryKeyRelatedField(many=False, read_only=True)

    class Meta:
        model = Todo
        fields = ('id', 'title', 'body', 'created_at', 'board', 'status')
