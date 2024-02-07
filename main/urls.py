from django.urls import path

from main.views import get_page

urlpatterns = [
    path('', get_page),
]