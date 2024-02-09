from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.generics import ListAPIView




# Create your views here.

def get_page(request):
    return render(request, 'index.html')

def login_view(request):
    return render(request, 'registration/login.html')



