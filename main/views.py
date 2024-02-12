from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.generics import ListAPIView

from main.models import Animal, Product, Brand, Review, Article, Sale, CategoryProduct

from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
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
    animals = Animal.objects.prefetch_related('brand_set', 'categoryproduct_set')
    products = Product.objects.all()
    products_on_sale = products.exclude(sale=1)
    popular_products = sorted(products,
                             key=lambda x: x.sales_counter,
                             reverse=True)
    articals = Article.objects.all()
    category = CategoryProduct.objects.all()
    brands = Brand.objects.all()

    context = {"animals": animals,
               "all_products": products,
               "products_on_sale": products_on_sale,
               "popular_products": popular_products,
               "articals": articals,
               "categoty_products": category,
               "brands": brands
               }
    return render(request=request,
                  template_name='catalog.html',
                  context=context)


def get_page_catalog_for_animal(request, animal_id):
    """Отдаем каталог для животного по id"""
    animals = Animal.objects.prefetch_related('brand_set', 'categoryproduct_set')
    products = Product.objects.all()
    products_on_sale = products.exclude(sale=animal_id)
    popular_products = sorted(products,
                              key=lambda x: x.sales_counter,
                              reverse=True)
    articals = Article.objects.all()
    category = CategoryProduct.objects.all()
    brands = Brand.objects.all()

    context = {"animals": animals,
               "all_products": products,
               "products_on_sale": products_on_sale,
               "popular_products": popular_products,
               "articals": articals,
               "categoty_products": category,
               "brands": brands
               }
    return render(request=request,
                  template_name='catalog.html',
                  context=context)


def get_details(request, id):
    '''Отдаем детальное описание товара по id'''
    product = Product.objects.get(id=id)
    articals = Article.objects.all()
    context = {
        "product": product,
        "articals": articals,
    }
    return render(request=request,
                  template_name='details.html',
                  context=context)


def get_basket_page(request):
    return render(request, 'basket.html')


#Beny tassks!!!!!========================
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
            user.save()
            return redirect('login')
        else:
            register_form = RegisterationForm(request.POST)
            return render(request, 'registration.html', {"register_form": register_form})
    else:
        register_form = RegisterationForm()
        return render(request, 'registration.html', {"register_form": register_form})


def reset_password(request):
    """Страница с формой сброса пароля"""
    reset_form = ForgetPasswordForm()
    return render(request, 'password_reset_form.html', {'reset_form': reset_form})


def logout_view(request):
    logout(request)
    return redirect('login')



def get_articles_page(request):
    return render(request, 'articles.html')