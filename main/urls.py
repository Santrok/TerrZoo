from django.urls import path
from django.contrib.auth.views import PasswordResetView, PasswordResetDoneView, PasswordResetConfirmView, \
    PasswordResetCompleteView
from django.urls import path, reverse_lazy
from main.views import get_page, login_view, registration_view, logout_view, reset_password


from main.views import get_page, get_page_catalog, get_details, get_basket_page

from main.views import get_page, get_page_catalog, get_details

urlpatterns = [
    path('', get_page, name='main'),
    path('catalog/', get_page_catalog, name='catalog'),
    path('details/<int:id>/', get_details, name='details'),
    path('basket', get_basket_page, name='basket'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('register/', registration_view, name='register'),
    path('reset_form/', reset_password, name='reset_form'),
    path('password-reset/',
         PasswordResetView.as_view(
             template_name="password_reset_form.html",
             email_template_name="password_reset_email.html",
             success_url=reverse_lazy("password_reset_done")),
         name='password_reset'),

    path('reset_password_sent/', PasswordResetDoneView.as_view(
        template_name='password_reset_done.html'),
         name='password_reset_done'),

    path('password-reset/<uidb64>/<token>/', PasswordResetConfirmView.as_view(
        template_name="password_reset_confirm.html",
        success_url=reverse_lazy("password_reset_complete")),
         name='password_reset_confirm'),

    path('reset_password_complete/', PasswordResetCompleteView.as_view(
        template_name='password_reset_complete.html'), name='password_reset_complete')

]