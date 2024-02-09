import re
from django.forms import forms

"""Валидатор проверки пароля на цифры, длинну и регистр"""
def validate_password(password_string):
    if not re.match(r'^(?=.*[A-Z])(?=.*[0-9]).{8,}$', password_string):
        raise forms.ValidationError('Некорректный ввод пароля')


"""Валидатор электронной почты. Проверка домена и символа @"""
def validate_email(email):
    if not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', email):
        raise forms.ValidationError('Некорректный адрес электронной почты')
