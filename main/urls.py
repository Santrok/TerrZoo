from django.urls import path

from main.views import get_page, get_page_catalog

urlpatterns = [
    path('', get_page),
    path('catalog/', get_page_catalog)

]