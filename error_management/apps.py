from django.apps import AppConfig


class ErrorManagementConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'error_management'
    verbose_name = ("Приложение управления ошибками "
                    "созданными преподавателем")
