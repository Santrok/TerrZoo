from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import render, redirect
from main.forms import LoginForm, RegisterationForm, ForgetPasswordForm


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
                return redirect('main:home')
            else:
                messages.error(request, 'Неверное имя или пароль!')
    login_form = LoginForm()
    return render(request, 'login.html', {'login_form': login_form})


def registration_view(request):
    """Страница с формой регистрации"""
    if request.method == 'POST':
        register_form = RegisterationForm(request.POST)
        if register_form.is_valid():
            user = User()
            user.username = register_form.cleaned_data.get('name').lower()
            user.email = register_form.cleaned_data.get('email')
            user.set_password(register_form.cleaned_data.get('password'))
            user.save()
            return redirect('main:login')
        else:
            register_form = RegisterationForm(request.POST)
            return render(request, 'registration.html', {"register_form": register_form})
    else:
        register_form = RegisterationForm()
        return render(request, 'registration.html', {"register_form": register_form})


def reset_password(request):
    """Страница с формой сброса пароля"""
    reset_form = ForgetPasswordForm()
    return render(request, 'password_reset_form.html', {'reset_form': reset_form})


def logout_view(request):
    logout(request)
    return redirect('main:login')
