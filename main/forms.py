from django import forms
from main.validators import validate_email, validate_password, validate_username


class LoginForm(forms.Form):
    """Форма авторизации """
    username = forms.CharField(
        widget=forms.TextInput(attrs={'class': 'auth_input', 'placeholder': 'Введите Ваше имя'}),
        label='Имя')
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={'class': 'auth_input', 'placeholder': 'Введите пароль'}), label='Пароль')


class RegisterationForm(forms.Form):
    """Форма регистрации с использованием валидаторов электронной почты, пароля и пользователя"""

    name = forms.CharField(error_messages={'required': 'Не указано контактное лицо'},
                           max_length=50, widget=forms.TextInput(attrs={'class': 'auth_input','placeholder': 'Ваше имя'}), label='Имя',
                           validators=[validate_username])
    email = forms.CharField(error_messages={'required': 'Не указан адрес электронной почты'},
                            widget=forms.EmailInput(
                                attrs={'class': 'auth_input','id': 'email_register_field', 'placeholder': 'Введите Вашу почту'}),
                            validators=[validate_email], label='Адрес электронной почты')
    password = forms.CharField(error_messages={'required': 'Введите пароль'},
                               widget=forms.PasswordInput(
                                   attrs={'class': 'auth_input','id': 'password_register_field', 'placeholder': 'Введите пароль'}),
                               validators=[validate_password], label='Пароль')
    password2 = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'auth_input','placeholder': 'Повторите пароль'}), label='Повторите пароль')

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
                                attrs={'class': 'auth_input', 'placeholder': 'Введите Вашу почту'}))