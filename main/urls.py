from django.urls import path

from main.views import get_page, login_view, registration_view, reset_password

urlpatterns = [
    path('', get_page, name='home'),
    path('login/', login_view, name='login'),
    path('register/', registration_view, name='register'),
    path('reset_password/', reset_password, name='reset_password')

]
