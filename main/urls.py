from django.urls import path

from main.views import get_page, get_page_catalog, get_details, get_basket_page

urlpatterns = [
    path('', get_page, name='main'),
    path('catalog/', get_page_catalog, name='catalog'),
    path('details/<int:id>/', get_details, name='details'),
    path('basket', get_basket_page, name='basket')
]