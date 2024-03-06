from django.contrib import admin
from django.db import models


class Callback(models.Model):
    """Модель обратного звонка"""
    user = models.CharField("ФИО клиента", max_length=50)
    phone_number_user = models.CharField("Телефон клиента", max_length=50)
    callback_completed = models.BooleanField("Обратный звонок совершён", default=False)

    def __str__(self):
        return f'{self.user} {self.phone_number_user}'


class AdminCallback(admin.ModelAdmin):
    """Класс управления отображения в админ панели сущности: Callback"""
    list_editable = ["callback_completed"]
    list_display = ["user",
                    "phone_number_user",
                    "callback_completed", ]
    list_filter = ["user",
                   "phone_number_user", ]

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        if not request.user.is_superuser:
            queryset = queryset.exclude(callback_completed=True)
        return queryset
