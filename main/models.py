from django.db import models

from django.contrib import admin


# Create your models here.
class StyledComponents(models.Model):
    """ Модель управления генерации стилей CSS
        для моделирования ситуаций возможных ошибок
        для преподавателя Stormnet :):)))"""

    css_class_name = models.CharField("CSS class элемента HTML разметки", max_length=255,
                                      help_text="Выберите из элемента HTML на странице значение атрибута class")
    style = models.TextField("Атрибут:значение CSS")
    page_name = models.CharField("Название страницы", max_length=500)
    section_of_page = models.CharField("Блок где будет ошибка", max_length=500)
    theme = models.CharField("Тема занятия", max_length=2000)
    lesson_number = models.CharField("Номер занятия", max_length=2000)
    is_active = models.BooleanField("Статус применения")
    description = models.TextField("Описание генерируемой ошибки")

    def __str__(self):
        return self.css_class_name

    class Meta:
        verbose_name = "Объект моделирования ситуации"
        verbose_name_plural = "Объекты моделирования ситуаций"


class AdminStyledComponents(admin.ModelAdmin):
    list_editable = ["is_active"]
    list_display = ["css_class_name", "style", "section_of_page", "page_name", "theme", "lesson_number", "is_active",]
    list_filter = ["css_class_name", "is_active", "style", "section_of_page", "page_name", "theme", "lesson_number"]
