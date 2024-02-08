from django.urls import path

from main.views import get_page, StyledComponentsListView

urlpatterns = [
    path('', get_page),
    path("get_bugs/",StyledComponentsListView.as_view())
]