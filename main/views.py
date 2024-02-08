from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.generics import ListAPIView

from main.models import StyledComponents
from main.serialisers import StyledComponentsSerializer


# Create your views here.

def get_page(request):
    return render(request, 'index.html')


class StyledComponentsListView(ListAPIView):
    queryset = StyledComponents.objects.filter(is_active=True)
    serializer_class = StyledComponentsSerializer
