from django.urls import path

from main.views import get_page,login_view

urlpatterns = [
    path('', get_page),
    path('login/', login_view, name='login')

]