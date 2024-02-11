from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.generics import ListAPIView

from main.models import Animal, Product, Brand, Review, Article


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
    print('________________________________')
    for i in animals:
        print(i.type)
        for a in i.brand_set.all():
            print(a.name)
        for b in i.categoryproduct_set.all():
            print('@@@',b.name)
    context = {"animals": animals,
               "products": products

    }
    return render(request=request,
                  template_name='catalog.html',
                  context=context)