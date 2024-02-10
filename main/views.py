from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.generics import ListAPIView

from main.models import Animal, Product, Brand


# Create your views here.

def get_page(request):
    """"""
    brands = Brand.objects.all()
    for brand in brands:
        print(brand.image)
    # print(brand)
    animals = Animal.objects.all()
    products = list(Product.objects.all())
    popular_product = sorted(products,
                             key=lambda x: x.sales_counter,
                             reverse=True)
    new_products = sorted(products,
                          key=lambda x: x.id,
                          reverse=True)

    # for i in popular_product:
        # print(i.sales_counter)
    context = {"animals": animals,
               "popular_products": popular_product,
               "new_products": new_products}
    return render(request=request,
                  template_name='index.html',
                  context=context)
