import os
import json
from django.core.mail import send_mail
from config import settings

from main.models import Order


def get_check_file(basket, order_price, user):
    """Создание файла чек"""
    basket_obj = json.loads(basket)
    last_order = Order.objects.last()

    directory = f'media/checks/{user}/'
    os.makedirs(directory, exist_ok=True)

    file_path = directory + f'check_{last_order.id + 1}.txt'

    with open(file_path, "w", encoding="utf-8") as file:
        file.write(f'Чек номер {last_order.order_number}\n')

        for obj in basket_obj:
            file.write(f'"{obj["title"][0:25]}...": {obj["count"]} шт. x {obj["initPrice"]} BYN - {obj["price"]} BYN\n')

        file.write(f'Итого: {order_price}')

    return file_path


def send_check_for_mail(order_number, file_url, user):
    """Отправка содержимого чека на почту"""
    file_check = file_url
    with open(file_check, 'r', encoding="utf-8") as file:
        content = file.read()
    send_mail(f"Территория Zoo заказ №{order_number}",
              f'{content}',
              settings.EMAIL_HOST_USER,
              [user.email],
              fail_silently=False)
