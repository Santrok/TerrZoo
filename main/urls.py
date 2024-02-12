from django.contrib.auth.views import PasswordResetView, PasswordResetDoneView, PasswordResetConfirmView, \
    PasswordResetCompleteView
from django.urls import path, reverse_lazy
<<<<<<< HEAD
from main.views import login_view, registration_view, logout_view, reset_password, get_articles_page, \
    activate_user, confirm_email, get_basket_page, get_page, get_page_catalog, get_details, \
    get_page_catalog_by_animal
=======
from main.views import get_page, login_view, registration_view, logout_view, reset_password, get_basket_page,get_page_catalog, get_details
>>>>>>> 9046520 (js fun set errors)

urlpatterns = [
    path('', get_page, name='main'),
    path('catalog/', get_page_catalog, name='catalog'),
    path('catalog/<int:animal_id>/', get_page_catalog_by_animal, name='catalog_by_animal'),
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
        template_name='password_reset_complete.html'), name='password_reset_complete'),
    path('articles/', get_articles_page, name='articles'),
    path('activate/<str:uidb64>/<str:token>/', activate_user, name='activate'),
    path('confirm_email/', confirm_email, name='confirm_email'),
]
