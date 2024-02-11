from django.urls import path

from main.views import get_page, get_details

urlpatterns = [
    path('', get_page),
    path('details/<int:id>/', get_details, name='details'),
]