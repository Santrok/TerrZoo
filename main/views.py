from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.generics import ListAPIView

from main.models import Animal, Product, Brand, Review, Article, Sale, CategoryProduct


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
    animals = Animal.objects.prefetch_related('brand_set','categoryproduct_set')
    products = Product.objects.all()
    products_on_sale = products.exclude(sale= 1 )
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