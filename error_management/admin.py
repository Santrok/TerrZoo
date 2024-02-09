from django.contrib import admin

from error_management.models import StyledComponents, AdminStyledComponents

# Register your models here.

admin.site.register(StyledComponents, AdminStyledComponents)