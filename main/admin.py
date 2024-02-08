from django.contrib import admin

from main.models import AdminStyledComponents, StyledComponents

# Register your models here.


admin.site.register(StyledComponents, AdminStyledComponents)
