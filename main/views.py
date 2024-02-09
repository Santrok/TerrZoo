from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.generics import ListAPIView

from main.forms import LoginForm


# Create your views here.

def get_page(request):
    return render(request, 'index.html')

def login_view(request):
    login_form = LoginForm()
    return render(request, 'registration/login.html', {'login_form': login_form})



