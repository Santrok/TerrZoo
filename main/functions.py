import os
import json
from config import settings
from django.core.mail import EmailMessage

from main.models import Order, ArticleForOrders, Product
from manager_tasks.models import OrderForAnonymousUser


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
    alfabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if ArticleForOrders.objects.last():
        article = ArticleForOrders.objects.last()
        article.article += 1
        if article.article > 999:
            article.article = 1
            if article.letter_code[1] != 'Z':
                index = alfabet.find(article.letter_code[1])
                article.letter_code = article.letter_code[0] + alfabet[index + 1]
            else:
                if article.letter_code != 'ZZ':
                    index = alfabet.find(article.letter_code[2])
                    article.letter_code = alfabet[index + 1] + 'A'
                else:
                    article.letter_code = 'AA'
        article.save()
    else:
        article = ArticleForOrders(article=1,
                                   letter_code='AA')
        article.save()

    if Order.objects.last():
        order_counter = article.article
        symbols = article.letter_code
        number = f'AN{user_id:03}{symbols}{order_counter:03}'
        return number
    else:
        order_counter = article.article
        symbols = article.letter_code
        number = f'AN{user_id:03}{symbols}{order_counter:03}'
        return number


def save_order_for_user(request, user, status, card=None):
    """Сохраняем заказ для пользователя"""
    json_obj = json.loads(request.POST.get('basket'))
    product_list_id = []
    for i in json_obj:
        product_list_id.append(i.get('id'))
    product_list = Product.objects.filter(id__in=product_list_id)
    article_for_orders = get_article_for_orders(user.id)
    file_url = get_check_file(request.POST.get('basket'),
                              request.POST.get('order_price').split(' ')[0],
                              user,
                              article_for_orders)
    if request.POST.get('receiving_an_order'):
        if request.POST.get('receiving_an_order') == 'pickup':
            order_receiving = 'Самовывоз'
            city = request.POST.get('address').split(', ')[0]
            street = request.POST.get('address').split(', ')[1][4:]
            house_number = request.POST.get('address').split(', ')[2]
            order = Order(order_number=article_for_orders,
                          user=user,
                          check_order=file_url,
                          total_price=request.POST.get('order_price').split(' ')[0],
                          pay_card=card,
                          order_status=status,
                          order_item=json_obj,
                          city=city,
                          street=street,
                          order_receiving=order_receiving,
                          house_number=house_number)
            order.save()
            for i in product_list:
                i.sales_counter += 1
                # i.quantity -= 1
                i.save()
                order.products.add(i)
            return order.order_number
        elif request.POST.get('receiving_an_order') == 'courier_deliver':
            if request.POST.get('city') != '':
                if request.POST.get('street') != '':
                    if request.POST.get('house_number_courier') != '':
                        if request.POST.get('postal_code') != '':
                            order_receiving = 'Доставка курьером'
                            city = request.POST.get('city')
                            street = request.POST.get('street')
                            house_number = request.POST.get('house_number_courier')
                            postal_code = request.POST.get('postal_code')
                            if request.POST.get('entrance_number') and request.POST.get('apartment_number'):
                                entrance_number = request.POST.get('entrance_number')
                                apartment_number = request.POST.get('apartment_number')
                                order = Order(order_number=article_for_orders,
                                              user=user,
                                              check_order=file_url,
                                              total_price=request.POST.get('order_price').split(' ')[0],
                                              pay_card=card,
                                              order_status=status,
                                              order_item=json_obj,
                                              city=city,
                                              street=street,
                                              order_receiving=order_receiving,
                                              house_number=house_number,
                                              entrance_number=entrance_number,
                                              apartment_number=apartment_number,
                                              postal_code=postal_code)
                            else:
                                order = Order(order_number=article_for_orders,
                                              user=user,
                                              check_order=file_url,
                                              total_price=request.POST.get('order_price').split(' ')[0],
                                              order_status=status,
                                              order_item=json_obj,
                                              city=city,
                                              street=street,
                                              order_receiving=order_receiving,
                                              house_number=house_number,
                                              postal_code=postal_code)
                            order.save()
                            for i in product_list:
                                i.sales_counter += 1
                                # i.quantity -= 1
                                i.save()
                                order.products.add(i)
                            return order.order_number
                        else:
                            return "Введите почтовый индекс"
                    else:
                        return "Введите номер дома"
                else:
                    return "Введите улицу"
            else:
                return "Введите город"
    else:
        return 'Не выбран способ получения заказа'


def save_order_for_anonymous_user(request, status):
    """Сохраняем заказ для анонимного пользователя"""
    if request.POST.get('phone'):
        if request.POST.get('payment_method'):
            if request.POST.get('receiving_an_order'):
                json_obj = json.loads(request.POST.get('basket'))
                product_list_id = []
                for i in json_obj:
                    product_list_id.append(i.get('id'))
                product_list = Product.objects.filter(id__in=product_list_id)
                article_for_orders = get_article_for_orders('XXX')
                file_url = get_check_file(request.POST.get('basket'),
                                          request.POST.get('order_price').split(' ')[0],
                                          'anonymous',
                                          article_for_orders)
                phone = request.POST.get('phone')
                name = request.POST.get('name')
                if request.POST.get('receiving_an_order') == 'pickup':
                    order_receiving = 'Самовывоз'
                    city = request.POST.get('address').split(', ')[0]
                    street = request.POST.get('address').split(', ')[1][4:]
                    house_number = request.POST.get('address').split(', ')[2]
                    order_anonymous = OrderForAnonymousUser(order_number=article_for_orders,
                                                            order_status=status,
                                                            check_order=file_url,
                                                            order_item=json_obj,
                                                            total_price=request.POST.get('order_price').split(' ')[0],
                                                            order_receiving=order_receiving,
                                                            name_anonymous_user=name,
                                                            phone_number=phone,
                                                            city=city,
                                                            street=street,
                                                            house_number=house_number)
                    order_anonymous.save()
                    for i in product_list:
                        i.sales_counter += 1
                        # i.quantity -= 1
                        i.save()
                    return order_anonymous.order_number
                elif request.POST.get('receiving_an_order') == 'courier_deliver':
                    order_receiving = 'Доставка курьером'
                    if request.POST.get('city'):
                        if request.POST.get('street'):
                            if request.POST.get('house_number_courier'):
                                if request.POST.get('postal_code'):
                                    city = request.POST.get('city')
                                    street = request.POST.get('street')
                                    house_number = request.POST.get('house_number_courier')
                                    postal_code = request.POST.get('postal_code')
                                    if request.POST.get('entrance_number') and request.POST.get('apartment_number'):
                                        entrance_number = request.POST.get('entrance_number')
                                        apartment_number = request.POST.get('apartment_number')
                                        order_anonymous = OrderForAnonymousUser(order_number=article_for_orders,
                                                                                order_status=status,
                                                                                check_order=file_url,
                                                                                order_item=json_obj,
                                                                                total_price=request.POST
                                                                                .get('order_price')
                                                                                .split(' ')[0],
                                                                                order_receiving=order_receiving,
                                                                                name_anonymous_user=name,
                                                                                phone_number=phone,
                                                                                city=city,
                                                                                street=street,
                                                                                house_number=house_number,
                                                                                entrance_number=entrance_number,
                                                                                apartment_number=apartment_number,
                                                                                postal_code=postal_code)
                                    else:
                                        order_anonymous = OrderForAnonymousUser(order_number=article_for_orders,
                                                                                order_status=status,
                                                                                check_order=file_url,
                                                                                order_item=json_obj,
                                                                                total_price=request.POST
                                                                                .get('order_price')
                                                                                .split(' ')[0],
                                                                                order_receiving=order_receiving,
                                                                                name_anonymous_user=name,
                                                                                phone_number=phone,
                                                                                city=city,
                                                                                street=street,
                                                                                house_number=house_number,
                                                                                postal_code=postal_code)
                                    order_anonymous.save()
                                    for i in product_list:
                                        i.sales_counter += 1
                                        # i.quantity -= 1
                                        i.save()
                                    return order_anonymous.order_number
                                else:
                                    return "Введите почтовый индекс"
                            else:
                                return "Введите номер дома"
                        else:
                            return "Введите улицу"
                    else:
                        return "Введите город"
            else:
                return "Не выбран ни один из способов получения заказа"
        else:
            return "Не выбран способ оплаты"
    else:
        return "Введите номер телефона"
