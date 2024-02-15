from django.contrib import admin

from error_management.models import StyledComponents, AdminStyledComponents, SetErrorLink, AdminSetErrorLink, \
    SetErrorDataApiV1, AdminSetErrorDataApiV1

# Register your models here.

admin.site.register(StyledComponents, AdminStyledComponents)
admin.site.register(SetErrorLink, AdminSetErrorLink)
admin.site.register(SetErrorDataApiV1, AdminSetErrorDataApiV1)