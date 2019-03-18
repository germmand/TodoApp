from rest_framework import serializers
from Profiles.models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    boards = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    image = serializers.SerializerMethodField()
    first_name = serializers.CharField(max_length=150, allow_blank=True)
    last_name  = serializers.CharField(max_length=150, allow_blank=True)
    
    class Meta:
        model = Profile
        fields = ('bio', 'image', 'first_name', 'last_name', 'boards')

    def get_image(self, obj):
        if obj.image:
            return obj.image
        return 'https://forums.roku.com/styles/canvas/theme/images/no_avatar.jpg'
