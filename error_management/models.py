from django.contrib import admin
from django.db import models


# Create your models here.
# Модели (плюс классы для админ панели)
#   для генерации вариантов ошибок
#      и создания условий для тестов
# ====================================================================
class StyledComponents(models.Model):
    """ Модель управления генерации стилей CSS:
         -для моделирования ситуаций возможных ошибок
          -для преподавателя Stormnet :):)))"""

    css_class_name = models.CharField("CSS class элемента HTML разметки",
                                      max_length=255,
                                      help_text="Выберите из элемента HTML"
                                                " на странице значение атрибута class")
    style = models.TextField("Атрибут:значение CSS")
    page_name = models.CharField("Название страницы",
                                 max_length=500)
    section_of_page = models.CharField("Блок где будет ошибка",
                                       max_length=500)
    theme = models.CharField("Тема занятия",
                             max_length=2000)
    lesson_number = models.CharField("Номер занятия",
                                     max_length=2000)
    is_active = models.BooleanField("Статус применения")
    description = models.TextField("Описание генерируемой ошибки")

    def __str__(self):
        return self.css_class_name

    class Meta:
        verbose_name = "Объект моделирования ситуации HTML CSS"
        verbose_name_plural = "Объекты моделирования ситуаций HTML CSS"


class AdminStyledComponents(admin.ModelAdmin):
    """Класс управления отображения
         в админ панели сущности:
           StyledComponents"""

    list_editable = ["is_active"]
    list_display = ["css_class_name",
                    "style",
                    "section_of_page",
                    "page_name",
                    "theme",
                    "lesson_number",
                    "is_active", ]
    list_filter = ["css_class_name",
                   "is_active",
                   "style",
                   "section_of_page",
                   "page_name",
                   "theme",
                   "lesson_number"]


# Класс создания функциональных ошибок:
#  - для базовой логики переходов по странице


class SetErrorLink(models.Model):
    """ Модель управления подменой ссылок в <a href=''></a> HTML:
             -для моделирования ситуаций возможных ошибок
              -для преподавателя Stormnet :):)))"""

    html_id_tag_a = models.CharField("ID HTML тег <a id='ид элемента' ></a> разметки",
                                     max_length=255,
                                     help_text="Выберите из элемента a в HTML"
                                               " на странице значение атрибута id")
    href = models.TextField("Атрибут:значение ссылка")
    page_name = models.CharField("Название страницы",
                                 max_length=500)
    section_of_page = models.CharField("Блок где будет ошибка",
                                       max_length=500)
    theme = models.CharField("Тема занятия",
                             max_length=2000)
    lesson_number = models.CharField("Номер занятия",
                                     max_length=2000)
    is_active = models.BooleanField("Статус применения")
    description = models.TextField("Описание генерируемой ошибки")

    def __str__(self):
        return self.html_id_tag_a

    class Meta:
        verbose_name = "Объект моделирования функциональных ситуации Links"
        verbose_name_plural = "Объекты моделирования функциональных ситуаций Links"


class AdminSetErrorLink(admin.ModelAdmin):
    """Класс управления отображения
         в админ панели сущности:
           StyledComponents"""

    list_editable = ["is_active"]
    list_display = ["html_id_tag_a",
                    "href",
                    "section_of_page",
                    "page_name",
                    "theme",
                    "lesson_number",
                    "is_active", ]
    list_filter = ["html_id_tag_a",
                   "is_active",
                   "href",
                   "section_of_page",
                   "page_name",
                   "theme",
                   "lesson_number"]


#  - для выдачи по REST-API

class SetErrorDataApiV1(models.Model):
    """ Модель управления генерации ошибок в ответы API:
                 -для моделирования ситуаций возможных ошибок
                  -для преподавателя Stormnet :):)))"""

    url_name = models.CharField("Название URL",
                                max_length=1500,
                                unique=True)
    model_name = models.CharField("Название Модели",
                                  max_length=1500)
    section_error = models.TextField("Блок создания ошибки")
    theme = models.CharField("Тема занятия",
                             max_length=2000)
    lesson_number = models.CharField("Номер занятия",
                                     max_length=2000)
    is_active = models.BooleanField("Статус применения", default=False)
    description = models.TextField("Описание генерируемой ошибки", default="123")

    def __str__(self):
        return self.url_name

    class Meta:
        verbose_name = "Объект моделирования функциональных ситуации REST API"
        verbose_name_plural = "Объекты моделирования функциональных ситуаций REST API"


class AdminSetErrorDataApiV1(admin.ModelAdmin):
    """Класс управления отображения
         в админ панели сущности:
           SetErrorDataApiV1"""

    list_editable = ["is_active"]
    list_display = ["url_name",
                    "model_name",
                    "section_error",
                    "theme",
                    "lesson_number",
                    "is_active",
                    "description"]
    list_filter = ["url_name",
                   "model_name",
                   "section_error",
                   "theme",
                   "lesson_number",
                   "is_active", ]
