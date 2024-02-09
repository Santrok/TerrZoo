from django.shortcuts import render
from rest_framework.generics import ListAPIView

from api.serializers import StyledComponentsSerializer
from error_management.models import StyledComponents


# Create your views here.
class StyledComponentsListView(ListAPIView):
    queryset = StyledComponents.objects.filter(is_active=True)
    serializer_class = StyledComponentsSerializer
