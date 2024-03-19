import json
import os
import random

from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import authenticate, login, logout, update_session_auth_hash
from django.contrib.auth.decorators import login_required
from django.contrib.auth.hashers import check_password, make_password
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.http import JsonResponse
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode

from django.shortcuts import render, redirect

from config import settings
from django.db.models import Count, Sum

from config.settings import env_keys
from main.models import (Animal, Product, Brand, Review, Article, Sale,
                         CategoryProduct, Order, PayCard, Profile, Store)
from main.forms import (LoginForm, RegisterationForm, ForgetPasswordForm,
                        ProfileForm, ProfileUserPasswordForm, ProfileUserNameForm)

from main.functions import (save_order_for_user, save_order_for_anonymous_user)


def get_page(request):
    """"""
    articals = Article.objects.all()
    reviews = Review.objects.select_related('user').all()
    brands = Brand.objects.all()[0:12]
    animals = Animal.objects.all()
    products = list(Product.objects.all().select_related('sale', 'category').prefetch_related('countitemproduct_set'))
    popular_product = sorted(products[:20],
                             key=lambda x: x.sales_counter,
                             reverse=True)
    new_products = sorted(products[:30],
                          key=lambda x: x.id,
                          reverse=True)
    context = {"animals": animals,
               "popular_products": popular_product,
               "new_products": new_products,
               "popular_brands": brands,
               "reviews": reviews,
               "articals": articals,
               "url": env_keys.get('URL')}
    return render(request=request,
                  template_name='index.html',
                  context=context)


def search_catalog(request):
    animals = Animal.objects.all()
    products = Product.objects.all().select_related('sale', 'category').prefetch_related('countitemproduct_set')
    popular_products = sorted(products[:20],
                              key=lambda x: x.sales_counter,
                              reverse=True)
    articals = Article.objects.all()
    category = CategoryProduct.objects.all()
    brands = Brand.objects.all()

    context = {"animals": animals,
               "products": products,
               "popular_products": popular_products,
               "articals": articals,
               "categoty_products": category,
               "brands": brands,
               "url": env_keys.get('URL')}

    return render(request=request,
                  template_name='search.html',
                  context=context)


def get_page_catalog(request):
    animals = Animal.objects.all()
    products = Product.objects.all().select_related('sale', 'category').prefetch_related('countitemproduct_set')
    popular_products = sorted(products[:20],
                              key=lambda x: x.sales_counter,
                              reverse=True)
    articals = Article.objects.all()
    category = CategoryProduct.objects.all()
    brands = Brand.objects.all()

    context = {"animals": animals,
               "products": products,
               "popular_products": popular_products,
               "articals": articals,
               "categoty_products": category,
               "brands": brands,
               "url": env_keys.get('URL')}

    return render(request=request,
                  template_name='catalog.html',
                  context=context)


def get_page_catalog_by_animal(request, animal_id):
    """Отдаем каталог по id животного"""
    products = Product.objects.filter(animal=animal_id).select_related('sale',
                                                                       'category').prefetch_related(
        'countitemproduct_set')

    popular_products = sorted(products[:20],
                              key=lambda x: x.sales_counter,
                              reverse=True)
    animals = Animal.objects.all()
    articles_on_animals = Article.objects.filter(animal=animal_id)
    category_by_animals = CategoryProduct.objects.filter(product__id__in=products)
    c = set(list(category_by_animals))
    j = []
    for i in list(c):
        for p in CategoryProduct.objects.add_related_count(i.get_family(), Product, 'category', 'asd',
                                                           cumulative=True, extra_filters={'animal': animal_id}):
            j.append(p)
    st = list(set(j))
    brands_by_animals = set(list(Brand.objects.filter(product__id__in=products)))
    context = {"animals": animals,
               "products": products,
               "popular_products": popular_products,
               "articals": articles_on_animals,
               "category_products": st,
               "brands": brands_by_animals,
               "url": env_keys.get('URL')}
    return render(request=request,
                  template_name='catalog_by_animal.html',
                  context=context)


def get_details(request, id):
    '''Отдаем детальное описание товара по id'''
    articles = Article.objects.all()
    products_set = Product.objects.all().select_related('sale', 'category').prefetch_related('countitemproduct_set')
    products = list(products_set)
    product = products_set.get(id=id)
    popular_product = sorted(products[:20],
                             key=lambda x: x.sales_counter,
                             reverse=True)
    # изменить сортировку на продукты с этим покупают
    joint_products = sorted(products_set.order_by('?')[:random.randint(5, 13)],
                            key=lambda x: x.id,
                            reverse=False)
    product_unit = ''
    for i in product.countitemproduct_set.all():
        product_unit = i.unit
    context = {
        "product": product,
        "articals": articles,
        "popular_products": popular_product,
        "joint_products": joint_products,
        "product_unit": product_unit,
        "url": env_keys.get('URL')}
    return render(request=request,
                  template_name='details.html',
                  context=context)


def get_basket_page(request):
    """Функция обработки данных страницы basket"""
    articals = Article.objects.all()
    products = list(Product.objects.all().select_related('sale', 'category').prefetch_related('countitemproduct_set'))
    popular_product = sorted(products[:20],
                             key=lambda x: x.sales_counter,
                             reverse=True)
    new_products = sorted(products[:30],
                          key=lambda x: x.id,
                          reverse=True)
    context = {
        "popular_products": popular_product,
        "new_products": new_products,
        "articals": articals,
        "url": env_keys.get('URL')
    }
    return render(request, 'basket.html', context)


# Beny tassks!!!!!========================
def login_view(request):
    """Страница с формой авторизации"""
    if request.method == 'POST':
        login_form = LoginForm(request.POST)
        if login_form.is_valid():
            username = login_form.cleaned_data.get('username')
            password = login_form.cleaned_data.get('password')

            remember_me = request.POST.get('remember_me', False)
            if remember_me:
                request.session.set_expiry(None)
            else:
                request.session.set_expiry(settings.SHORT_SESSION_SECONDS)

            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('main')
            else:
                error_login = 'Неверные логин или пароль! Попробуйте еще раз!'
                login_form = LoginForm(request.POST)
                return render(request, 'login.html', {'login_form': login_form, 'error': error_login})
    error_login = ''
    login_form = LoginForm()
    return render(request, 'login.html', {'login_form': login_form, 'error': error_login, "url": env_keys.get('URL')})


def registration_view(request):
    """Страница с формой регистрации"""
    if request.method == 'POST':
        register_form = RegisterationForm(request.POST)
        if register_form.is_valid():
            user = User()
            user.username = register_form.cleaned_data.get('name')
            user.email = register_form.cleaned_data.get('email')
            user.set_password(register_form.cleaned_data.get('password'))
            user.is_active = False
            user.save()
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)
            activation_url = f"{env_keys.get('URL')}/activate/{uid}/{token}/"
            subject = 'Пожалуйста, перейдите по ссылке для подтверждения:'
            send_mail(subject, f'{activation_url}',
                      settings.EMAIL_HOST_USER,
                      [user.email],
                      fail_silently=False)

            return redirect('confirm_email')
        else:
            register_form = RegisterationForm(request.POST)
            return render(request, 'registration.html', {"register_form": register_form, "url": env_keys.get('URL')})
    else:
        register_form = RegisterationForm()
        return render(request, 'registration.html', {"register_form": register_form, "url": env_keys.get('URL')})


def confirm_email(request):
    """Шаблон информации об успешной регистрации и подтверждения имейл"""
    return render(request, 'confirmation_email.html', {"url": env_keys.get('URL')})


def activate_user(request, uidb64, token):
    """Декодирует ссылку из почты и активирует пользователя"""
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
        if default_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            return redirect('successful_email')
        else:
            return redirect('register')
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        return redirect('activation_failure')


def successful_email(request):
    """Страница успешного подтверждения email"""
    return render(request, 'successful_email_confirmation.html', {"url": env_keys.get('URL')})


def reset_password(request):
    """Страница с формой сброса пароля"""
    reset_form = ForgetPasswordForm()
    return render(request, 'password_reset_form.html', {'reset_form': reset_form, "url": env_keys.get('URL')})


def logout_view(request):
    logout(request)
    return redirect('main')


def get_articles_page(request):
    """Отдаем каталог по id животного"""
    animals = Animal.objects.all()
    products = Product.objects.all().select_related('sale', 'category').prefetch_related('countitemproduct_set')
    popular_products = sorted(products,
                              key=lambda x: x.sales_counter,
                              reverse=True)
    articles = Article.objects.all()

    context = {"animals": animals,
               "popular_products": popular_products,
               "articles": articles,
               "url": env_keys.get('URL')}

    return render(request=request,
                  template_name='articles.html',
                  context=context)


def get_brands_page(request):
    brands_list = Brand.objects.all()
    context = {
        'brands': brands_list,
        "url": env_keys.get('URL')
    }
    return render(request, 'brands.html', context)


def get_article_by_article_id(request, article_id):
    """Отдаем выбранную статью"""
    articles = Article.objects.all()
    article = articles.get(id=article_id)
    popular_products = sorted(
        Product.objects.all().select_related('sale', 'category').prefetch_related('countitemproduct_set')[:20],
        key=lambda x: x.sales_counter,
        reverse=True)

    context = {"article": article,
               "articles": articles,
               "popular_products": popular_products,
               "url": env_keys.get('URL')}

    return render(request=request,
                  template_name='article_by_id.html',
                  context=context)


def get_article_by_animals_id(request, animal_id):
    """Отдаем статьи по id животного"""
    animals = Animal.objects.all()
    articles = Article.objects.filter(animal=animal_id)
    popular_products = sorted(
        Product.objects.all().select_related('sale', 'category').prefetch_related('countitemproduct_set')[:20],
        key=lambda x: x.sales_counter,
        reverse=True)

    context = {"animals": animals,
               "articles": articles,
               "popular_products": popular_products,
               "url": env_keys.get('URL')}

    return render(request=request,
                  template_name='articles_by_animal_id.html',
                  context=context)


def get_promotions_page(request):
    """Отдаем все акции"""
    animals = Animal.objects.all()
    promotions = Sale.objects.exclude(percent=0).reverse()
    popular_products = sorted(
        Product.objects.all().select_related('sale', 'category').prefetch_related('countitemproduct_set')[:20],
        key=lambda x: x.sales_counter,
        reverse=True)

    context = {"animals": animals,
               "promotions": promotions,
               "popular_products": popular_products,
               "url": env_keys.get('URL')}

    return render(request=request,
                  template_name='promotions.html',
                  context=context)


def get_placing_an_order_page(request):
    '''Отдает страничку оформления заказов'''
    user = request.user
    stores = Store.objects.all()
    if request.method == "POST":
        if ((request.POST.get('basket') != 'null' and
             request.POST.get('basket') != '' and
             request.POST.get('basket') != '[]') or (request.POST.get('oneClickItem') != 'null' and
                                                     request.POST.get('oneClickItem') != '' and
                                                     request.POST.get('oneClickItem') != '[]')):
            if user.is_authenticated:
                if request.POST.get('payment_method') == 'pay_online':
                    pay_card = (f"{request.POST.get('num_paycard_1_4', '0')}"
                                f"{request.POST.get('num_paycard_5_8', '0')}"
                                f"{request.POST.get('num_paycard_9_12', '0')}"
                                f"{request.POST.get('num_paycard_13_16', '0')}")
                    if len(pay_card) == 16:
                        date_card = request.POST.get('date', '0')
                        cvc = request.POST.get('CVV')
                        if not cvc:
                            cvc = 000
                        card_zapros = PayCard.objects.filter(card_number=pay_card,
                                                             cvc=cvc,
                                                             expiration_date=date_card,
                                                             user=user)
                        if card_zapros:
                            if card_zapros[0].balance >= float(request.POST.get('order_price').split(' ')[0]):
                                order_number = save_order_for_user(request, user, 'Оплачен', card_zapros[0])
                                if order_number in ["Не выбран способ получения заказа",
                                                    "Введите город",
                                                    "Введите улицу",
                                                    "Введите номер дома",
                                                    "Введите почтовый индекс"]:
                                    return JsonResponse({"error": order_number})
                                else:
                                    card_zapros[0].balance = float(card_zapros[0].balance) - float(
                                        request.POST.get("order_price").split(' ')[0])
                                    card_zapros[0].save()
                                    return JsonResponse({"order_number": order_number, "user_email": user.email})
                            else:
                                return JsonResponse({"error": "Недостаточно средств"})
                        else:
                            return JsonResponse({"error": "Введенные данные не верны"})
                    else:
                        return JsonResponse({"error": "Введенные данные не верны"})
                elif request.POST.get('payment_method') == 'cash':
                    order_number = save_order_for_user(request, user, 'Оформлен')
                    if order_number in ["Не выбран способ получения заказа",
                                        "Введите город",
                                        "Введите улицу",
                                        "Введите номер дома",
                                        "Введите почтовый индекс"]:
                        return JsonResponse({"error": order_number})
                    else:
                        return JsonResponse({"order_number": order_number})
                else:
                    return JsonResponse({"error": "Не выбран ни один из способов оплаты"})
            else:
                order_number = save_order_for_anonymous_user(request, 'Оформлен')
                if order_number in ["Не выбран ни один из способов получения заказа",
                                    "Введите номер телефона",
                                    "Не выбран способ оплаты", "Введите город",
                                    "Введите улицу",
                                    "Введите номер дома",
                                    "Введите почтовый индекс"]:
                    return JsonResponse({"error": order_number})
                else:
                    return JsonResponse({"order_number": order_number})
        else:
            return JsonResponse({"error": "Кoрзина пуста, необходимо добавить товар!"})
    context = {
        'stores': stores,
        "url": env_keys.get('URL'),
    }
    return render(request=request,
                  template_name='placing_an_order.html',
                  context=context)


@login_required
def get_profile_order_page(request):
    """Личный кабинет"""
    orders = (Order.objects.prefetch_related('products', 'user', 'pay_card')
              .filter(user=request.user.id)
              .filter(order_show=True)
              .order_by('-data_create'))
    pay_cards = PayCard.objects.filter(user=request.user.id)

    context = {"orders": orders,
               "pay_cards": pay_cards,
               "url": env_keys.get('URL')}

    return render(request=request,
                  template_name='profile_order.html',
                  context=context)


@login_required
def get_profile_wishlist_page(request):
    '''Отдаем страничку с избранными товарами из личного кабинета'''
    return render(request=request, template_name='profile_wishlist.html', context={"url": env_keys.get('URL')})


@login_required
def get_profile_comparisonlist_page(request):
    '''Отдаем страничку со списком сравнения из личного кабинета'''
    # products = Product.objects.all().select_related('sale', 'category').prefetch_related('countitemproduct_set')

    context = {
        # 'products': products,
        "url": env_keys.get('URL')
    }
    return render(request=request,
                  template_name='profile_comparisonlist.html',
                  context=context)


@login_required
def get_profile_page_data_user(request):
    """Личный кабинет первая страница"""
    user = request.user
    profile = Profile.objects.get(user=user)

    form_profile = ProfileForm(instance=profile, initial={'first_name': user.first_name,
                                                          'last_name': user.last_name,
                                                          'email': user.email})
    form_profile_user = ProfileUserNameForm(instance=user)
    form_profile_password = ProfileUserPasswordForm(instance=user)

    context = {"form_profile": form_profile,
               "form_profile_user": form_profile_user,
               "form_profile_password": form_profile_password,
               "url": env_keys.get('URL')}

    if request.method == 'POST':
        if request.POST.get('action') == 'profile':
            form_data_profile = ProfileForm(request.POST, instance=profile)
            form_data_user = ProfileForm(request.POST, instance=user)
            if form_data_profile.is_valid() and form_data_user.is_valid():
                form_data_profile.save()
                form_data_user.save()
                context['form_profile_modified'] = 'Данные успешно изменены.'

            form_profile = ProfileForm(request.POST)
            form_profile.errors.update(form_data_profile.errors)
            form_profile.errors.update(form_data_user.errors)
            context['form_profile'] = form_profile
            return render(request, template_name='profile_data_user.html', context=context)

        elif request.POST.get('action') == 'profile_user_username':
            form_data_user = ProfileUserNameForm(request.POST)
            if form_data_user.is_valid():
                if form_data_user.cleaned_data.get('username'):
                    user.username = form_data_user.cleaned_data.get('username')
                    user.save()
                    context['form_profile_user_modified'] = 'Логин успешно изменен.'
            context['form_profile_user'] = form_data_user
            return render(request, template_name='profile_data_user.html', context=context)

        elif request.POST.get('action') == 'profile_user_password':
            form_data_pass = ProfileUserPasswordForm(request.POST, instance=user)
            if form_data_pass.is_valid():
                password = make_password(form_data_pass.cleaned_data.get('password'))
                new_password = form_data_pass.cleaned_data.get('new_password')
                repeat_password = form_data_pass.cleaned_data.get('repeat_new_pass')
                if check_password(user.password, password) and password and new_password and repeat_password:
                    user.set_password(new_password)
                    user.save()
                    context['form_profile_password_modified'] = 'Пароль успешно изменен.'
                    update_session_auth_hash(request, user)
            context['form_profile_password'] = form_data_pass
            return render(request, template_name='profile_data_user.html', context=context)

    return render(request=request, template_name='profile_data_user.html', context=context)


@login_required
def get_profile_viewed_products_page(request):
    return render(request=request,
                  template_name="profile_viewed_products.html",
                  context={"url": env_keys.get('URL')})


@login_required
def get_profile_subscriptions_page(request):
    '''Страничка с оформлением подписки на акции и новые статьи'''
    status = Profile.objects.get(user=request.user).subscribe
    profile = Profile.objects.get(user=request.user)
    context = {
        'status': status,
        "url": env_keys.get('URL')
    }
    if request.method == 'POST':
        query_dict = request.POST
        if status is False and query_dict.get('subscribe') == 'on':
            profile.subscribe = True
            profile.save()
            return redirect('subscription_status')
        if status is True and query_dict.get('subscribe') is None:
            profile.subscribe = False
            profile.save()
            return redirect('subscription_status')
        else:
            return redirect('subscription_status')
    return render(request=request,
                  template_name="profile_subscriptions.html",
                  context=context)


@login_required
def get_status_subscription_page(request):
    status = Profile.objects.get(user=request.user).subscribe
    context = {
        'status': status,
        "url": env_keys.get('URL')
    }
    return render(request=request,
                  template_name="subscription_status_page.html",
                  context=context)


def get_order_details_page(request, order_id):
    '''Отдаем страничку с деталями заказа из личного кабинета'''
    order_details = Order.objects.get(id=order_id)
    order_details.count = 0
    json_obj = order_details.order_item
    product_list = []
    for i in json_obj:
        product = Product.objects.filter(id=i.get('id'))
        add_in_product = product[0]
        add_in_product.weight = i.get('weight')[0]
        add_in_product.count = i.get('count')
        add_in_product.sumPrice = i.get('price')
        order_details.count += i.get('count')
        product_list.append(add_in_product)

    context = {
        'order_details': order_details,
        'product_list': product_list,
        "url": env_keys.get('URL')
    }
    return render(request=request,
                  template_name='profile_order_details.html',
                  context=context)


def delete_profile_order(request, order_id):
    """Скрываем (удаляем) заказ из списка"""
    order = Order.objects.get(id=order_id)
    order.order_show = False
    order.save()
    return redirect('profile_orders')
