from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import Group
from Authentication.models import User

class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'email', 'created_at', 'is_admin')
    list_filter = ('is_admin',)
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal Info', {'fields': ('email', 'created_at')}),
        ('Permissions', {'fields': ('is_admin',)}),
    )
    search_fields = ('email', 'username')   
    ordering = ('email', 'username')   
    filter_horizontal = ()

admin.site.register(User, UserAdmin)
admin.site.unregister(Group)
