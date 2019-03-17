from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import Group
from Authentication.models import User

class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'email', 'created_at', 'first_name', 'last_name', 'is_admin')
    list_filter = ('is_admin',)
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal Info', {'fields': ('email', 'first_name', 'last_name', 'created_at')}),
        ('Permissions', {'fields': ('is_admin',)}),
    )
    search_fields = ('email', 'username', 'first_name', 'last_name')   
    ordering = ('email', 'username', 'first_name', 'last_name')   
    filter_horizontal = ()

admin.site.register(User, UserAdmin)
admin.site.unregister(Group)
