
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.http import JsonResponse
from django.shortcuts import render
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from rest_framework.generics import ListAPIView

from config import settings
from main.models import Animal, Product, Brand, Review, Article, Sale, CategoryProduct
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from main.forms import LoginForm, RegisterationForm, ForgetPasswordForm


# Create your views here.

def get_page(request):
    """"""
    articals = Article.objects.all()
    reviews = Review.objects.select_related('user').all()
    brands = Brand.objects.all()[0:12]
    animals = Animal.objects.all()
    products = list(Product.objects.all())
    popular_product = sorted(products,
                             key=lambda x: x.sales_counter,
                             reverse=True)
    new_products = sorted(products,
                          key=lambda x: x.id,
                          reverse=True)
    context = {"animals": animals,
               "popular_products": popular_product,
               "new_products": new_products,
               "popular_brands": brands,
               "reviews": reviews,
               "articals": articals}
    return render(request=request,
                  template_name='index.html',
                  context=context)


def get_page_catalog(request):

    animals = Animal.objects.prefetch_related('brand_set', 'categoryproduct_set')  # Нам точно надо тут preferch?
    products = Product.objects.all()
    products_on_sale = products.exclude(sale=1)
    popular_products = sorted(products,
                              key=lambda x: x.sales_counter,
                              reverse=True)
    articals = Article.objects.all()
    category = CategoryProduct.objects.all()
    brands = Brand.objects.all()

    context = {"animals": animals,
               "all_products": products,  # Это точно надо? На странички catalog.html не используется
               "products_on_sale": products_on_sale,
               "popular_products": popular_products,
               "articals": articals,
               "categoty_products": category,

               "brands": brands}

    return render(request=request,
                  template_name='catalog.html',
                  context=context)


def get_page_catalog_by_animal(request, animal_id):
    """Отдаем каталог по id животного"""
    animals = Animal.objects.all()
    products = Product.objects.all()
    products_on_sale = products.exclude(sale=1)
    popular_products = sorted(products,
                              key=lambda x: x.sales_counter,
                              reverse=True)
    articles_on_animals = Article.objects.filter(animal=animal_id)
    category_by_animals = CategoryProduct.objects.filter(animal=animal_id)
    brands_by_animals = Brand.objects.filter(animal=animal_id)

    context = {"animals": animals,
               "products_on_sale": products_on_sale,
               "popular_products": popular_products,
               "articals": articles_on_animals,
               "categoty_products": category_by_animals,
               "brands": brands_by_animals}
    return render(request=request,
                  template_name='catalog_by_animal.html',
                  context=context)


def get_details(request, id):
    '''Отдаем детальное описание товара по id'''
    product = Product.objects.get(id=id)
    articals = Article.objects.all()
    products = list(Product.objects.all())
    popular_product = sorted(products,
                             key=lambda x: x.sales_counter,
                             reverse=True)
    # изменить сортировку на продукты с этим покупают
    joint_products = sorted(products,
                            key=lambda x: x.id,
                            reverse=True)
    context = {
        "product": product,
        "articals": articals,
        "popular_products": popular_product,
        "joint_products": joint_products,
    }
    return render(request=request,
                  template_name='details.html',
                  context=context)


def get_basket_page(request):
    """Функция обработки данных страницы basket"""
    return render(request, 'basket.html')


# Beny tassks!!!!!========================
def login_view(request):
    """Страница с формой авторизации"""
    if request.method == 'POST':
        login_form = LoginForm(request.POST)
        print(request.POST)
        if login_form.is_valid():
            username = login_form.cleaned_data.get('username')
            password = login_form.cleaned_data.get('password')
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('main')
            else:
                messages.error(request, 'Неверное имя или пароль!')
    login_form = LoginForm()
    return render(request, 'login.html', {'login_form': login_form})


def registration_view(request):
    """Страница с формой регистрации"""
    if request.method == 'POST':
        register_form = RegisterationForm(request.POST)
        if register_form.is_valid():
            user = User()
            user.username = register_form.cleaned_data.get('name').lower()
            user.email = register_form.cleaned_data.get('email')
            user.set_password(register_form.cleaned_data.get('password'))
            user.is_active = False
            user.save()
            login(request, user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)
            activation_url = f"http://127.0.0.1:8000/activate/{uid}/{token}/"
            subject = 'Пожалуйста, перейдите по ссылке для подтверждения:'
            send_mail(subject, f'{activation_url}',
                      settings.EMAIL_HOST_USER,
                      [user.email],
                      fail_silently=False)
            return redirect('confirm_email')
        else:
            register_form = RegisterationForm(request.POST)
            return render(request, 'registration.html', {"register_form": register_form})
    else:
        register_form = RegisterationForm()
        return render(request, 'registration.html', {"register_form": register_form})

def confirm_email(request):
    """Шаблон информации об успешной регистрации и подтверждения имейл"""
    return render(request,'confirmation_email.html')



def activate_user(request, uidb64, token):
    """Декодирует ссылку из почты и активирует пользователя"""
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
        if default_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            login(request, user)
            return redirect('main')
        else:
            return redirect('register')
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        return redirect('activation_failure')


def reset_password(request):
    """Страница с формой сброса пароля"""
    reset_form = ForgetPasswordForm()
    return render(request, 'password_reset_form.html', {'reset_form': reset_form})


def logout_view(request):
    logout(request)
    return redirect('login')



def get_articles_page(request):
    """Отдаем каталог по id животного"""
    animals = Animal.objects.all()
    products = Product.objects.all()
    popular_products = sorted(products,
                              key=lambda x: x.sales_counter,
                              reverse=True)
    articles = Article.objects.all()

    context = {"animals": animals,
               "popular_products": popular_products,
               "articles": articles}

    return render(request=request,
                  template_name='articles.html',
                  context=context)


def get_brands_page(request):
    brands_list = Brand.objects.all()
    context = {
        'brands': brands_list
    }
    return render(request, 'brands.html', context)


