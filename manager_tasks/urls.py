from django.urls import path

from manager_tasks.views import save_callback

urlpatterns = [
    path('callback/', save_callback, name='callback')
]
