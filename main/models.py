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

    type = models.CharField("Вид животного", max_length=255)
    image = models.ImageField(upload_to="animals")

    def __str__(self):
        return self.type

    class Meta:
        verbose_name = "Животное"
        verbose_name_plural = "Животные"


class AdminAnimal(admin.ModelAdmin):
    """Класс управления отображения в админ панели сущности: Animal"""


class CategoryProduct(MPTTModel):
    """ Модель категорий товаров связь:
          с животными(М2М),дерево связи в самой таблице MPТT(FK),
             продукты(FK) """

    name = models.CharField("Название категории", max_length=255)
    parent = TreeForeignKey('self', on_delete=models.CASCADE, null=True, blank=True,
                            verbose_name="Имя родительсокй категории")
    animal = models.ManyToManyField("Animal", verbose_name="Животное")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Категория продукта"
        verbose_name_plural = "Категории продуктов"


class AdminCategoryProduct(admin.ModelAdmin):
    """Класс управления отображения в админ панели сущности: CategoryProduct"""


class Product(models.Model):
    """ Модель продуктов, связи с категориями(FK),
         брендами(FK), скидкамии (акция) (M2M),
           количество(FK),изображениями(FK) заказы(М2М)"""

    title = models.CharField("Название продукта", max_length=500)
    image_prev = models.ImageField("Обязательное изображение", blank=True, null=True, upload_to="products_images")
    price = models.DecimalField("Цена товара за единицу", max_digits=20, decimal_places=2)
    description = models.TextField("Описание товара", blank=True, null=True)
    key_features = models.TextField("Ключевые особенности", blank=True, null=True)
    compound = models.TextField("Состав", blank=True, null=True)
    guaranteed_analysis = models.TextField("Гарантированный анализ", blank=True, null=True)
    nutritional_supplements = models.TextField("Пищевые добавки", blank=True, null=True)
    quantity = models.PositiveIntegerField("Количество товара")
    category = models.ForeignKey("CategoryProduct", verbose_name="Категория продукта", on_delete=models.CASCADE)
    brand = models.ForeignKey("Brand", verbose_name="Бренд товара", on_delete=models.CASCADE)
    sale = models.ManyToManyField("Sale", verbose_name="Товар на акции")
    order = models.ManyToManyField("Order", verbose_name="Заказ")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Продукт"
        verbose_name_plural = "Продукты"


class AdminProduct(admin.ModelAdmin):
    """Класс управления отображения в админ панели сущности: Product"""


class ImageProduct(models.Model):
    """Модель изображений продукта, связи: с продуктами(FK)"""

    image = models.ImageField("Изображение продукта", upload_to="products_images")
    product = models.ForeignKey("Product", on_delete=models.CASCADE, verbose_name="Продукт")

    def __str__(self):
        return self.product

    class Meta:
        verbose_name = "Изображение продукта"
        verbose_name_plural = "Изображения продуктов"


class AdminImageProduct(admin.ModelAdmin):
    """Класс управления отображения в админ панели сущности: ImageProduct"""


class CountItemProduct(models.Model):
    """Модель  количества, объема, массы """

    percent = models.PositiveIntegerField("Процент от стоимости единицы товара")
    unit = models.CharField("Единица измерения", max_length=255)
    value = models.FloatField("Количество массы")
    product = models.ForeignKey("Product", verbose_name="Продукт", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.value} {self.unit}."

    class Meta:
        verbose_name = "Количество товара"
        verbose_name_plural = "Количество товара"


class AdminCountItemProduct(admin.ModelAdmin):
    """Класс управления отображения в админ панели сущности: CountItemProduct"""


class Sale(models.Model):
    """Модель Акций и скидок, связи: с продуктом(M2M)"""

    title = models.CharField("Название акции", max_length=500)
    percent = models.PositiveIntegerField("Процент")
    start_sale = models.DateTimeField("Время начала акции")
    stop_sale = models.DateTimeField("Время окончания акции")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Акция"
        verbose_name_plural = "Акции"


class AdminSale(admin.ModelAdmin):
    """Класс управления отображения в админ панели сущности: Sale"""


class Article(models.Model):
    """Модель статей, связи:
       с животные(FK), """

    title = models.CharField("Название статьи", max_length=1500)
    text = models.TextField("Текст статьи")
    image = models.ImageField("Изображение", upload_to="articles_images")
    date_create = models.DateTimeField(auto_now_add=True)
    read_time = models.CharField("Время чтения", max_length=255)

    animal = models.ForeignKey("Animal", on_delete=models.CASCADE, verbose_name="Животные")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Статья"
        verbose_name_plural = "Статьи"


class AdminArticle(admin.ModelAdmin):
    """Класс управления отображения в админ панели сущности: Sale"""


class Brand(models.Model):
    """Модель Брендов связи:
        с продуктом(FK), животными(М2М)"""

    name = models.CharField("Имя бренда", max_length=255)
    image = models.ImageField("Изображение", upload_to="brands_images")
    animal = models.ManyToManyField("Animal")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Бренд"
        verbose_name_plural = "Бренды"


class AdminBrand(admin.ModelAdmin):
    """Класс управления отображения в админ панели сущности: Brand"""


class Review(models.Model):
    """Модель отзывы, связи: пользователь(FK)"""

    text = models.TextField("Текст отзыва")
    pet = models.CharField("Kличка питомца", max_length=255)
    user = models.ForeignKey(User, verbose_name="Пользователь", on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username

    class Meta:
        verbose_name = "Отзыв"
        verbose_name_plural = "Отзывы"


class AdminReview(admin.ModelAdmin):
    """Класс управления отображения в админ панели сущности: Review"""


class Order(models.Model):
    """Модель заказа связи: с пользователем(FK), продуктом(М2М) карты(FK)"""

    order_number = models.PositiveIntegerField( verbose_name='Номер заказа')
    data_create = models.DateTimeField("Время заказа", auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Пользователь")
    check_order = models.FileField("Чек", upload_to="cheks")
    total_price = models.DecimalField("Сумма заказа", max_digits=8, decimal_places=2)
    pay_card = models.ForeignKey("PayCard", on_delete=models.CASCADE, verbose_name="Карта")

    def __str__(self):
        return f"{self.user.username} {self.order_number}"

    def create_check(self, data_request):
        """Создать чек формат file_name.json"""
        data = ""
        return data

    def get_total_price(self, total_price_request):
        """Посчитать стоимость заказа (сумма чека) Float"""
        total_price = 0
        return total_price

    class Meta:
        verbose_name = "Заказ"
        verbose_name_plural = "Заказы"


class AdminOrder(admin.ModelAdmin):
    """Класс управления отображения в админ панели сущности: Order"""


class PayCard(models.Model):
    """Модель платежной карты связи: c пользователем(FK) заказ(FK)"""
    card_number = models.CharField("Номер карты", max_length=16, unique=True)
    cvc = models.PositiveIntegerField("CVC")
    balance = models.DecimalField("Баланс на карте", max_digits=100, decimal_places=2)
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Пользователь")

    def __str__(self):
        return f"{self.card_number}  {self.user.username}"

    class Meta:
        verbose_name = "Карточка"
        verbose_name_plural = "Карточки"


class AdminPayCard(admin.ModelAdmin):
    """Класс управления отображения в админ панели сущности: PayCard"""
