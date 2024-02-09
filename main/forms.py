from django import forms

from main.validators import validate_email, validate_password


class LoginForm(forms.Form):
    """Форма авторизации """
    username = forms.CharField(
        widget=forms.TextInput(attrs={'id': 'username_login_field', 'placeholder': 'Введите Ваше имя'}),
        label='')
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={'id': 'password_login_field', 'placeholder': 'Введите пароль'}), label='')


class RegisterForm(forms.Form):
    """Форма регистрации с использованием валидаторов электронной почты и пароля"""

    name = forms.CharField(error_messages={'required': 'Не указано контактное лицо'},
                           max_length=50, widget=forms.TextInput(attrs={'placeholder': 'Ваше имя'}), label='')
    email = forms.CharField(error_messages={'required': 'Не указан адрес электронной почты'},
                            widget=forms.EmailInput(
                                attrs={'id': 'email_register_field', 'placeholder': 'Введите Вашу почту'}),
                            validators=[validate_email], label='')
    password = forms.CharField(error_messages={'required': 'Введите пароль'},
                               widget=forms.PasswordInput(
                                   attrs={'id': 'password_register_field', 'placeholder': 'Введите пароль'}),
                               validators=[validate_password], label='')
    password2 = forms.CharField(widget=forms.PasswordInput(attrs={'placeholder': 'Повторите пароль'}), label='')

    def clean(self):
        """Проверка совпадения паролей"""
        cleaned_data = super().clean()
        password = cleaned_data.get('password')
        password2 = cleaned_data.get('password2')
        if password and password2 and password != password2:
            self.add_error('password2', 'Пароли не совпадают')

class ForgetPasswordForm(forms.Form):
    """Форма ввода адреса электронной почты для сброса пароля"""
    email = forms.CharField(error_messages={'required': 'Не указан адрес электронной почты'},
                            widget=forms.EmailInput(
                                attrs={'id': 'forget_email_field', 'placeholder': 'Введите Вашу почту'}))

