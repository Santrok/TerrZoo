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
    """Класс управления отображения в админ панели сущности
      StyledComponents"""
    list_editable = ["is_active"]
    list_display = ["css_class_name", "style", "section_of_page", "page_name", "theme", "lesson_number", "is_active", ]
    list_filter = ["css_class_name", "is_active", "style", "section_of_page", "page_name", "theme", "lesson_number"]


class CategoryProduct(models.Model):
    """ Модель категорий товаров"""


class AdminCategoryProduct(admin.ModelAdmin):
    """Класс управления отображения в админ панели сущности CategoryProduct"""


class Product(models.Model):
    """ Модель продуктов """


class AdminProduct(admin.ModelAdmin):
    """Класс управления отображения в админ панели сущности Product"""


class Sale(models.Model):
    """Модель Акций и скидок """


class AdminSale(admin.ModelAdmin):
    """Класс управления отображения в админ панели сущности Sale"""


class Article(models.Model):
    """Модель статей """


class AdminArticle(admin.ModelAdmin):
    """Класс управления отображения в админ панели сущности Sale"""


class Basket(models.Model):
    """Модель корзины"""


class AdminBasket(admin.ModelAdmin):
    """Класс управления отображения в админ панели сущности Basket"""


class Brand(models.Model):
    """Модель Брендов"""


class AdminBrand(admin.ModelAdmin):
    """Класс управления отображения в админ панели сущности Brand"""


class Review(models.Model):
    """Модель отзывы"""


class AdminReview(admin.ModelAdmin):
    """Класс управления отображения в админ панели сущности Review"""


class Order(models.Model):
    """Модель заказа"""


class AdminOrder(admin.ModelAdmin):
    """Класс управления отображения в админ панели сущности Order"""


class PayCard(models.Model):
    """Модель платежной карты"""


class AdminPayCard(admin.ModelAdmin):
    """Класс управления отображения в админ панели сущности PayCard"""