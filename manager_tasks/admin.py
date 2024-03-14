from django.contrib import admin

from manager_tasks.models import (Callback, AdminCallback,
                                  OrderForAnonymousUser, AdminOrderForAnonymousUser)

admin.site.register(Callback, AdminCallback)
admin.site.register(OrderForAnonymousUser, AdminOrderForAnonymousUser)
