import re

from django.contrib.auth.models import User
from django.forms import forms


def validate_password(password_string):
    """Валидатор проверки пароля на цифры, длинну и регистр"""
    if not re.match(r'^(?=.*[A-Z])(?=.*[0-9]).{8,}$', password_string):
        raise forms.ValidationError('Некорректный ввод пароля')


def validate_email(email):
    """Валидатор электронной почты. Проверка домена и символа @"""
    if not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', email):
        raise forms.ValidationError('Некорректный адрес электронной почты')


def validate_username(username):
    if User.objects.filter(username=username).exists():
        raise forms.ValidationError('Такой пользователь уже зарегистрирован')
    # if not re.match(r'^(?!\\d+$)[a-zA-Zа-яА-Я\\d]{3,20}$', username):
    #      raise forms.ValidationError('Недопустимое имя')

