from django.urls import path

from .views import StyledComponentsListView

urlpatterns = [
    path("get_bugs/", StyledComponentsListView.as_view())
]
