from django.contrib import admin

from manager_tasks.models import Callback, AdminCallback

admin.site.register(Callback, AdminCallback)
