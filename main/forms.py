from django import forms
from django.contrib.auth.hashers import check_password, make_password
from django.contrib.auth.models import User
from datetime import date

from main.models import Profile
from main.validators import validate_email, validate_password, validate_username, validate_phone


class LoginForm(forms.Form):
    """Форма авторизации """
    username = forms.CharField(
        widget=forms.TextInput(attrs={'class': 'auth_input', 'placeholder': 'Введите Ваше имя', 'autofocus': True}),
        label='Логин')
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={'class': 'auth_input', 'placeholder': 'Введите пароль'}), label='Пароль')


class RegisterationForm(forms.Form):
    """Форма регистрации с использованием валидаторов электронной почты, пароля и пользователя"""

    name = forms.CharField(error_messages={'required': 'Не указано контактное лицо'},
                           max_length=50,
                           widget=forms.TextInput(attrs={'class': 'auth_input', 'placeholder': 'Ваше имя'}),
                           label='Логин',
                           validators=[validate_username])
    email = forms.CharField(error_messages={'required': 'Не указан адрес электронной почты'},
                            widget=forms.EmailInput(
                                attrs={'class': 'auth_input', 'id': 'email_register_field',
                                       'placeholder': 'Введите Вашу почту'}),
                            validators=[validate_email], label='Адрес электронной почты')
    password = forms.CharField(error_messages={'required': 'Введите пароль'},
                               widget=forms.PasswordInput(
                                   attrs={'class': 'auth_input', 'id': 'password_register_field',
                                          'placeholder': 'Введите пароль'}),
                               validators=[validate_password], label='Пароль')
    password2 = forms.CharField(
        widget=forms.PasswordInput(attrs={'class': 'auth_input', 'placeholder': 'Повторите пароль'}),
        label='Повторите пароль')

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


class ProfileForm(forms.ModelForm):
    first_name = forms.CharField(label='Имя',
                                 required=True,
                                 widget=forms.TextInput(
                                     attrs={'placeholder': 'Иван'}))
    last_name = forms.CharField(label='Фамилия',
                                required=True,
                                widget=forms.TextInput(
                                    attrs={'placeholder': 'Иванов'}))
    email = forms.CharField(label='Почта',
                            required=False,
                            widget=forms.TextInput(
                                attrs={'class': 'profile_form_email',
                                       'readonly': 'readonly'}))
    phone_number = forms.CharField(label='Номер телефона',
                                   max_length=19,
                                   required=True,
                                   widget=forms.TextInput(
                                       attrs={'placeholder': '+375 (29) 111-11-11'}),
                                   validators=[validate_phone])
    date_of_birth = forms.DateField(label='Дата рождения',
                                    required=True,
                                    initial=date.today,
                                    widget=forms.DateInput(
                                        attrs={'type': 'date'}))
    city = forms.CharField(label='Город',
                           max_length=120,
                           required=True,
                           widget=forms.TextInput(
                               attrs={'placeholder': 'Минск'}))
    street = forms.CharField(label='Улица / Переулок',
                             max_length=40,
                             required=True,
                             widget=forms.TextInput(
                                 attrs={'placeholder': 'ул. Беды'}))
    house_number = forms.CharField(label='Номер дома',
                                   max_length=4,
                                   required=True,
                                   widget=forms.TextInput(
                                       attrs={'placeholder': '1'}))
    entrance_number = forms.CharField(label='Номер подъезда',
                                      max_length=2,
                                      required=False,
                                      widget=forms.TextInput(
                                          attrs={'placeholder': '1'}))
    apartment_number = forms.CharField(label='Номер квартиры',
                                       max_length=4,
                                       required=False,
                                       widget=forms.TextInput(
                                           attrs={'placeholder': '1'}))
    postal_code = forms.CharField(label='Почтовый индекс',
                                  max_length=6,
                                  required=True,
                                  widget=forms.TextInput(
                                      attrs={'placeholder': '220000'}))

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['date_of_birth'].widget.format = '%Y-%m-%d'

    class Meta:
        model = Profile
        fields = ('first_name', 'last_name', 'email', 'phone_number', 'date_of_birth', 'city',
                  'street', 'house_number', 'entrance_number', 'apartment_number', 'postal_code')


class ProfileUserNameForm(forms.ModelForm):
    username = forms.CharField(label='Логин',
                               widget=forms.TextInput(
                                   attrs={'class': 'auth_input',
                                          'placeholder': 'Введите Ваше имя',
                                          'disabled': 'disabled'}))

    class Meta:
        model = User
        fields = ['username']


class ProfileUserPasswordForm(forms.ModelForm):
    password = forms.CharField(error_messages={'required': 'Введите пароль'},
                               label='Введите пароль',
                               widget=forms.PasswordInput(
                                   attrs={'class': 'password_person_reset_field',
                                          'placeholder': 'Введите старый пароль',
                                          'disabled': 'disabled'}))
    new_password = forms.CharField(label='Введите новый пароль',
                                   widget=forms.PasswordInput(
                                       attrs={'class': 'password_register_field',
                                              'placeholder': 'Введите новый пароль',
                                              'disabled': 'disabled'}),
                                   validators=[validate_password])
    repeat_new_pass = forms.CharField(label='Повторите новый пароль',
                                      widget=forms.PasswordInput(
                                          attrs={'class': 'repeat_password_register_field',
                                                 'placeholder': 'Повторите новый пароль',
                                                 'disabled': 'disabled'}),
                                      validators=[validate_password])

    def clean(self):
        cleaned_data = super().clean()
        new_password = cleaned_data.get('new_password')
        repeat_new_pass = cleaned_data.get('repeat_new_pass')
        if new_password and repeat_new_pass and new_password != repeat_new_pass:
            self.add_error('repeat_new_pass', 'Пароли не совпадают')

    def clean_password(self):
        password = self.cleaned_data.get('password')
        if password:
            user = self.instance
            if not check_password(password, user.password):
                raise forms.ValidationError('Неправильный пароль!')
        return password

    class Meta:
        model = User
        fields = ['password']
