import os
import json
from config import settings
from django.core.mail import EmailMessage

from main.models import Order, ArticleForOrders, Product


def get_check_file(basket, order_price, user, article):
    """Создание файла чек"""
    basket_obj = json.loads(basket)

    directory = f'media/checks/{user}/'
    os.makedirs(directory, exist_ok=True)

    file_path = directory + f'check_{article}.txt'

    with open(file_path, "w", encoding="utf-8") as file:
        file.write(f'Чек номер {article}\n')

        for obj in basket_obj:
            file.write(f'"{obj["title"][0:25]}...": {obj["count"]} шт. x {obj["initPrice"]} BYN - {obj["price"]} BYN\n')

        file.write(f'Итого: {order_price}')

    return file_path


def send_check_for_mail(order_number, file_url, user):
    """Отправка содержимого чека на почту"""
    email = EmailMessage(
        f"Территория Zoo заказ №{order_number}",
        "Чек",
        settings.EMAIL_HOST_USER,
        [user.email],
    )
    email.attach_file(file_url)
    email.send()


def get_article_for_orders(user_id):
    """Счетчик для артикля заказа"""
    if ArticleForOrders.objects.last():
        article = ArticleForOrders.objects.last()
        article.article += 1
        article.save()
    else:
        article = ArticleForOrders(article=1)
        article.save()

    if Order.objects.last():
        order_counter = article.article
        number = f'AN{user_id:03}AA{order_counter:03}'
        return number
    else:
        order_counter = article.article
        number = f'AN{user_id:03}AA{order_counter:03}'
        return number


def save_order_for_user(request, user, status):
    """Сохраняем заказ для пользователя"""
    json_obj = json.loads(request.POST.get('basket'))
    product_list_id = []
    for i in json_obj:
        product_list_id.append(i.get('id'))
    product_list = Product.objects.filter(id__in=product_list_id)
    article_for_orders = get_article_for_orders(user.id)
    file_url = get_check_file(request.POST.get('basket'),
                              request.POST.get('order_price'),
                              user,
                              article_for_orders)
    order = Order(order_number=article_for_orders,
                  user=user,
                  check_order=file_url,
                  total_price=request.POST.get('order_price'),
                  order_status=status,
                  order_item=json_obj)
    order.save()
    for i in product_list:
        i.sales_counter += 1
        # i.quantity -= 1
        i.save()
        order.products.add(i)
    return order.order_number
