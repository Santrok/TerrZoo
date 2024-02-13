from django.contrib import admin

from error_management.models import StyledComponents, AdminStyledComponents, SetErrorLink, AdminSetErrorLink

# Register your models here.

admin.site.register(StyledComponents, AdminStyledComponents)
admin.site.register(SetErrorLink, AdminSetErrorLink)