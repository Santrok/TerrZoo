from django.contrib import admin
from django.db import models

from main.models import Order


class Callback(models.Model):
    """Модель обратного звонка"""
    user = models.CharField("ФИО клиента", max_length=50)
    phone_number_user = models.CharField("Телефон клиента", max_length=50)
    callback_completed = models.BooleanField("Обратный звонок совершён", default=False)

    def __str__(self):
        return f'{self.user} {self.phone_number_user}'

    class Meta:
        verbose_name = "Обратные звонки"
        verbose_name_plural = "Обратный звонок"


class AdminCallback(admin.ModelAdmin):
    """Класс управления отображения в админ панели сущности: Callback"""

    list_editable = ["callback_completed"]
    list_display = ["user",
                    "phone_number_user",
                    "callback_completed", ]

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        if not request.user.is_superuser:
            queryset = queryset.exclude(callback_completed=True)
        return queryset

    def get_list_filter(self, request):
        if request.user.is_superuser:
            return ["user", "phone_number_user", "callback_completed"]
        else:
            return ["user", "phone_number_user"]


class OrderForAnonymousUser(models.Model):
    """Модель заказа для анонимного пользователя"""

    STATUS_ORDER = [
        ("Оформлен", "Оформлен"),
        ("Ожидает оплату", "Ожидает оплату"),
        ("Оплачен", "Оплачен"),
        ("Подтвержден", "Подтвержден"),
        ("Выполнен", "Выполнен"),
        ("Аннулирован", "Аннулирован"),
        ("Ошибка оплаты", "Ошибка оплаты"),
    ]

    METHOD_RECEIVING_ORDER = [
        ("Самовывоз","Саммовывоз"),
        ("Доставка курьером","Доставка курьером")
    ]

    order_number = models.CharField(verbose_name='Номер заказа', max_length=16)
    order_status = models.CharField(verbose_name='Статус', max_length=15,
                                    choices=STATUS_ORDER, default=STATUS_ORDER[0][0])
    check_order = models.FileField("Чек",
                                   upload_to="checks")
    order_item = models.JSONField(verbose_name='Детали заказа')

    data_create = models.DateTimeField("Время заказа",
                                       auto_now_add=True)
    total_price = models.DecimalField("Сумма заказа",
                                      max_digits=8, decimal_places=2)
    order_receving = models.CharField(verbose_name='Способ получения заказа',max_length=20,
                                      choices=METHOD_RECEIVING_ORDER, default=METHOD_RECEIVING_ORDER[0][0])
    phone_number = models.CharField(verbose_name="Номер телефона",
                                    max_length=18,
                                    blank=True)
    city = models.CharField(verbose_name="Город",
                            max_length=120,
                            blank=True,
                            null=True)
    street = models.CharField(verbose_name="Улица / Переулок",
                              max_length=40,
                              blank=True,
                              null=True)
    house_number = models.CharField(verbose_name="Номер дома",
                                    max_length=4,
                                    blank=True,
                                    null=True)
    entrance_number = models.CharField(verbose_name="Номер подъезда",
                                       max_length=2,
                                       blank=True,
                                       null=True)
    apartment_number = models.CharField(verbose_name="Номер квартиры",
                                        max_length=4,
                                        blank=True,
                                        null=True)
    postal_code = models.CharField(verbose_name="Почтовый индекс",
                                   max_length=6,
                                   blank=True,
                                   null=True)

    def __str__(self):
        return f"ID{self.id}: {self.order_number}"

    class Meta:
        verbose_name = "Заказ анонимного пользователя"
        verbose_name_plural = "Заказы анонимных пользователей"


class AdminOrderForAnonymousUser(admin.ModelAdmin):
    """Класс управления отображения в админ панели сущности: OrderForAnonymousUser"""

    list_editable = ["order_status"]
    list_display = ('order_number',
                    'order_status',)
    list_filter = ('order_status',)

    def get_readonly_fields(self, request, obj=None):
        if obj and not request.user.is_superuser:
            return 'order_number', 'data_create', 'total_price', 'order_item', 'order_show'
        return self.readonly_fields
