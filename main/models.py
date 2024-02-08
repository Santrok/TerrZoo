from django.contrib.auth.models import User
from django.db import models
from mptt.models import MPTTModel, TreeForeignKey
from django.contrib import admin


# Модели (плюс классы для админ панели) для генерации вариантов ошибок и создания условий для тестов
# ====================================================================
class StyledComponents(models.Model):
    """ Модель управления генерации стилей CSS:
         -для моделирования ситуаций возможных ошибок
          -для преподавателя Stormnet :):)))"""

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
    """Класс управления отображения в админ панели сущности:
        StyledComponents"""
    list_editable = ["is_active"]
    list_display = ["css_class_name", "style", "section_of_page", "page_name", "theme", "lesson_number", "is_active", ]
    list_filter = ["css_class_name", "is_active", "style", "section_of_page", "page_name", "theme", "lesson_number"]


# Модели (плюс классы для админ панели) сущностей сайта в базулечке
# =================================================================
class Animal(models.Model):
    """Модель животных связи с категориями(М2М),
        статьями(FK), бренд(М2М)"""


class AdminAnimal(admin.ModelAdmin):
    """Класс управления отображения в админ панели сущности: Animal"""


class CategoryProduct(MPTTModel):
    """ Модель категорий товаров связь:
          с животными(М2М),дерево связи в самой таблице MPТT(FK),
             продукты(FK) """
    parent = TreeForeignKey('self', on_delete=models.CASCADE, null=True, blank=True,
                            verbose_name="Имя родительсокй категории")
    animal = models.ManyToManyField("Animal", verbose_name="Животное")


class AdminCategoryProduct(admin.ModelAdmin):
    """Класс управления отображения в админ панели сущности: CategoryProduct"""


class Product(models.Model):
    """ Модель продуктов, связи с категориями(FK),
         брендами(FK), скидкамии (акция) (M2M),
           количество(FK),изображениями(FK) заказы(М2М)"""

    category = models.ForeignKey("CategoryProduct", verbose_name="Категория продукта", on_delete=models.CASCADE)
    brand = models.ForeignKey("Brand", verbose_name="Бренд товара", on_delete=models.CASCADE)
    sale = models.ManyToManyField("Sale", verbose_name="Товар на акции")
    order = models.ManyToManyField("Order", verbose_name="Заказ")


class AdminProduct(admin.ModelAdmin):
    """Класс управления отображения в админ панели сущности: Product"""


class ImageProduct(models.Model):
    """Модель изображений продукта, связи: с продуктами(FK)"""
    product = models.ForeignKey("Product", on_delete=models.CASCADE, verbose_name="Продукты")


class AdminImageProduct(admin.ModelAdmin):
    """Класс управления отображения в админ панели сущности: ImageProduct"""


class CountItemProduct(models.Model):
    """Модель  количества, объема, массы """
    product = models.ForeignKey("Product", verbose_name="Продукт", on_delete=models.CASCADE)


class AdminCountItemProduct(admin.ModelAdmin):
    """Класс управления отображения в админ панели сущности: CountItemProduct"""


class Sale(models.Model):
    """Модель Акций и скидок, связи: с продуктом(M2M)"""


class AdminSale(admin.ModelAdmin):
    """Класс управления отображения в админ панели сущности: Sale"""


class Article(models.Model):
    """Модель статей, связи:
       с животные(FK), """

    animal = models.ForeignKey("Animal",on_delete=models.CASCADE, verbose_name="Животные")


class AdminArticle(admin.ModelAdmin):
    """Класс управления отображения в админ панели сущности: Sale"""


class Brand(models.Model):
    """Модель Брендов связи:
        с продуктом(FK), животными(М2М)"""
    animal = models.ManyToManyField("Animal")


class AdminBrand(admin.ModelAdmin):
    """Класс управления отображения в админ панели сущности: Brand"""


class Review(models.Model):
    """Модель отзывы"""


class AdminReview(admin.ModelAdmin):
    """Класс управления отображения в админ панели сущности: Review"""


class Order(models.Model):
    """Модель заказа связи: с пользователем(FK), продуктом(М2М) карты(FK)"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Пользователь")
    pay_card = models.ForeignKey("PayCard", on_delete=models.CASCADE,verbose_name="Карта")


class AdminOrder(admin.ModelAdmin):
    """Класс управления отображения в админ панели сущности: Order"""


class PayCard(models.Model):
    """Модель платежной карты связи: c пользователем(FK) заказ(FK)"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Пользователь")



class AdminPayCard(admin.ModelAdmin):
    """Класс управления отображения в админ панели сущности: PayCard"""
