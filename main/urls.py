from django.contrib.auth.views import PasswordResetView, PasswordResetDoneView, PasswordResetConfirmView, \
    PasswordResetCompleteView
from django.urls import path, reverse_lazy

from main.views import (get_page, login_view, registration_view, logout_view, reset_password, get_basket_page,
                        get_page_catalog, get_details, get_page_catalog_by_animal, get_articles_page, activate_user,
                        confirm_email,
                        get_brands_page, get_article_by_article_id, get_article_by_animals_id, get_promotions_page,
                        search_catalog,
                        get_placing_an_order_page, get_profile_page_data_user, get_profile_order_page, get_profile_page, get_profile_wishlist_page, get_profile_comparisonlist_page, get_profile_page_data_user)

urlpatterns = [
    path('', get_page, name='main'),
    path('catalog/', get_page_catalog, name='catalog'),
    path('catalog/<int:animal_id>/', get_page_catalog_by_animal, name='catalog_by_animal'),
    path('details/<int:id>/', get_details, name='details'),
    path('basket/', get_basket_page, name='basket'),
    path('search/', search_catalog, name='search-catalog'),
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
    path('brands/', get_brands_page, name='brands'),
    path('article/<int:article_id>', get_article_by_article_id, name='article_by_id'),
    path('articles/<int:animal_id>', get_article_by_animals_id, name='articles_by_animal_id'),
    path('promotions/', get_promotions_page, name='promotions'),
    path('placing_an_order/', get_placing_an_order_page, name='placing_an_order'),
    path('profile/', get_profile_page, name='profile'),
    path('wishlist/', get_profile_wishlist_page, name='wishlist'),
    path('comparisonlist/', get_profile_comparisonlist_page, name='comparisonlist'),
    path('profile_data_user/', get_profile_page_data_user, name='profile_data_user'),
    path('profile/', get_profile_order_page, name='profile'),
]
