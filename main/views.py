from django.contrib import messages

from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import render, redirect
from rest_framework.generics import ListAPIView

from main.forms import LoginForm, RegisterForm, ForgetPasswordForm


# Create your views here.

def get_page(request):
    """Главная страница"""
    return render(request, 'index.html')

def login_view(request):
    """Страница с формой авторизации"""

    if request.method == 'POST':
        login_form = LoginForm(request.POST)
        print(request.POST)
        if login_form.is_valid():
            username = login_form.cleaned_data.get('username')
            password = login_form.cleaned_data.get('password')
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('home')
            else:
                messages.error(request, 'Неверное имя или пароль!')
    login_form = LoginForm()
    return render(request, 'registration/login.html', {'login_form': login_form})

def registration_view(request):
    """Страница с формой регистрации"""
    registration_form = RegisterForm()
    return render(request, 'registration/registration.html', {'registration_form': registration_form})

def reset_password(request):
    """Страница с формой сброса пароля"""
    reset_form = ForgetPasswordForm()
    return render(request, 'registration/foget_password.html', {'reset_form': reset_form})



