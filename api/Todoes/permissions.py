from rest_framework import permissions
from django.core.exceptions import ObjectDoesNotExist

from Todoes.models import TodoBoard

class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_staff

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.profile == request.user.profile

class OnlyOwnerCanAlterBoard(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        board_id = request.resolver_match.kwargs.get('board_id')
        user_boards = request.user.profile.boards
        try:
            user_boards.get(id=board_id)
        except ObjectDoesNotExist as exception:
            return False  
        return True
