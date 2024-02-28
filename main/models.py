from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.core.validators import FileExtensionValidator
from django.db import models
from django.utils.safestring import mark_safe
from django_ckeditor_5.fields import CKEditor5Field
from mptt.models import MPTTModel, TreeForeignKey
from django.contrib import admin


# Модели (плюс классы для админ панели)
#  сущностей сайта в базулечке
# ==============================================

class Animal(models.Model):
    """Модель животных связи с категориями(М2М),
        статьями(FK), бренд(М2М)"""

    type = models.CharField("Вид животного",
                            max_length=255,
                            unique=True)
    image = models.ImageField(upload_to="animals")

    def __str__(self):
        return self.type

    class Meta:
        verbose_name = "Животное"
        verbose_name_plural = "Животные"


class AdminAnimal(admin.ModelAdmin):
    """Класс управления отображения
        в админ панели сущности: Animal"""


class CategoryProduct(MPTTModel):
    """ Модель категорий товаров связь:
          с животными(М2М), дерево связи
             в самой таблице MPТT(FK), продукты(FK) """

    name = models.CharField("Название категории",
                            max_length=255,
                            unique=True)
    parent = TreeForeignKey('self',
                            on_delete=models.CASCADE,
                            null=True,
                            blank=True,
                            verbose_name="Имя родительсокй категории")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Категория продукта"
        verbose_name_plural = "Категории продуктов"


class AdminCategoryProduct(admin.ModelAdmin):
    """Класс управления отображения
        в админ панели сущности:
           CategoryProduct"""


class ImageProduct(models.Model):
    """Модель изображений продукта,
         связи: с продуктами(FK)"""

    image = models.ImageField("Изображение продукта",
                              upload_to="products_images")
    product = models.ForeignKey("Product",
                                on_delete=models.CASCADE,
                                verbose_name="Продукт")

    def __str__(self):
        return f'{self.product}'

    class Meta:
        verbose_name = "Изображение продукта"
        verbose_name_plural = "Изображения продуктов"


class AdminImageProduct(admin.ModelAdmin):
    """Класс управления отображения
        в админ панели сущности: ImageProduct"""


class CountItemProduct(models.Model):
    """Модель количества, объема, массы
    Product (FR)"""
    CHOICES = [
        ('л', 'л'),
        ('кг', 'кг'),
        ('шт', 'шт'),
    ]

    product = models.ForeignKey('Product',
                                verbose_name='Продукт',
                                on_delete=models.CASCADE)
    count = models.PositiveIntegerField('Количество продукта',
                                        default=0)
    value = models.FloatField("Количество массы")
    unit = models.CharField("Единица измерения", max_length=50, choices=CHOICES)
    percent = models.PositiveIntegerField("Процент от "
                                          "стоимости единицы товара")

    def __str__(self):
        return f"{self.value} {self.unit}."

    def total_price(self):
        """Метод расчета цены в зависимости
         от веса в процентном соотношении"""
        return round((self.percent / 100 * float((100 - self.product.sale.percent) / 100 * float(self.product.price))),2)

    class Meta:
        verbose_name = "Количество товара"
        verbose_name_plural = "Количество товара"
        ordering = ['product', ]


class AdminCountItemProduct(admin.ModelAdmin):
    """Класс управления отображения
        в админ панели сущности: CountItemProduct"""


class Product(models.Model):
    """ Модель продуктов, связи с категориями(FK),
         брендами(FK), скидкамии (акция) (M2M),
           количество(FK), изображениями(FK) заказы(М2М)"""

    title = models.CharField("Название продукта",
                             max_length=500,
                             unique=True)
    image_prev = models.FileField("Обязательное изображение",
                                  upload_to="products_images",
                                  help_text='Изображение должно быть в формате avif, '
                                            'преобразовать можно '
                                            '<a href="https://imagetostl.com/ru/convert/file/jpg/to/avif">тут</a>',
                                  validators=[FileExtensionValidator(['avif'])])
    price = models.DecimalField("Цена товара за единицу",
                                max_digits=20,
                                decimal_places=2)
    description = models.TextField("Описание товара",
                                   blank=True,
                                   null=True)
    key_features = models.TextField("Ключевые особенности",
                                    blank=True,
                                    null=True)
    animal = models.ManyToManyField("Animal",
                                    verbose_name="Животное")
    compound = models.TextField("Состав",
                                blank=True,
                                null=True)
    guaranteed_analysis = models.TextField("Гарантированный анализ",
                                           blank=True,
                                           null=True)
    nutritional_supplements = models.TextField("Пищевые добавки",
                                               blank=True,
                                               null=True)
    quantity = models.PositiveIntegerField("Количество товара")
    category = models.ForeignKey("CategoryProduct",
                                 verbose_name="Категория продукта",
                                 on_delete=models.CASCADE)
    brand = models.ForeignKey("Brand",
                              verbose_name="Бренд товара",
                              on_delete=models.CASCADE)
    sale = models.ForeignKey("Sale", on_delete=models.SET_NULL,
                             verbose_name="Товар на акции",
                             blank=True,
                             null=True,
                             help_text='Если товар не на акции, необходимо задать акцию с 0% скидки')
    date_create = models.DateTimeField(auto_now_add=True)
    sales_counter = models.PositiveIntegerField("Сколько раз продан", default=0)

    def __str__(self):
        return f"{self.title}  id:{self.id}"

    def action_price(self):
        """Метод для расчета цены в период
         акции в процентном соотношении"""
        res = (100 - self.sale.percent) / 100 * float(self.price)
        return res

    class Meta:
        verbose_name = "Продукт"
        verbose_name_plural = "Продукты"


class ImageProductInlines(admin.StackedInline):
    model = ImageProduct
    max_num = 10
    extra = 0


class CountItemProductInlines(admin.TabularInline):
    model = CountItemProduct
    max_num = 10
    extra = 0


class AdminProduct(admin.ModelAdmin):
    """Класс управления отображения
        в админ панели сущности: Product"""

    def get_html_photo(self, object):
        return mark_safe(f"<img src='{object.image_prev.url}' width=50>")

    inlines = [ImageProductInlines, CountItemProductInlines]
    list_display = ['title',
                    # 'category',
                    'image_prev',
                    # 'get_html_photo',
                    'sale', ]


class Sale(models.Model):
    """Модель Акций и скидок, связи:
        с продуктом(M2M)"""

    title = models.CharField("Название акции",
                             max_length=500,
                             unique=True)
    percent = models.PositiveIntegerField("Процент")
    start_sale = models.DateTimeField("Время начала акции")
    stop_sale = models.DateTimeField("Время окончания акции")
    image = models.ImageField('Баннер',
                              upload_to="sale",
                              default='default/action.png')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Акция"
        verbose_name_plural = "Акции"


class AdminSale(admin.ModelAdmin):
    """Класс управления отображения
        в админ панели сущности: Sale"""


class Article(models.Model):
    """Модель статей, связи:
       с животные(FK), """

    title = models.CharField("Название статьи",
                             max_length=1500,
                             unique=True)
    text = CKEditor5Field('Текст статьи', config_name='extends')
    image = models.FileField("Изображение",
                             upload_to="articles_images",
                             help_text='Изображение должно быть в формате avif,'
                                       'преобразовать можно '
                                       '<a href="https://imagetostl.com/ru/convert/file/jpg/to/avif">тут</a>',
                             validators=[FileExtensionValidator(['avif'])])
    date_create = models.DateTimeField(auto_now_add=True)
    read_time = models.CharField("Время чтения",
                                 max_length=255)

    animal = models.ForeignKey("Animal",
                               on_delete=models.CASCADE,
                               verbose_name="Животные")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Статья"
        verbose_name_plural = "Статьи"


class AdminArticle(admin.ModelAdmin):
    """Класс управления отображения
        в админ панели сущности: Sale"""


class Brand(models.Model):
    """Модель Брендов связи:
        с продуктом(FK), животными(М2М)"""

    name = models.CharField("Имя бренда",
                            max_length=255,
                            unique=True)
    image = models.ImageField("Изображение",
                              upload_to="brands_images")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Бренд"
        verbose_name_plural = "Бренды"


class AdminBrand(admin.ModelAdmin):
    """Класс управления отображения
        в админ панели сущности: Brand"""


class Review(models.Model):
    """Модель отзывы, связи: пользователь(FK)"""

    text = models.TextField("Текст отзыва")
    pet = models.CharField("Kличка питомца",
                           max_length=255)
    user = models.ForeignKey(User,
                             verbose_name="Пользователь",
                             on_delete=models.CASCADE)
    phone_number = models.CharField('Номер телефона',
                                    max_length=13,
                                    blank=True,
                                    null=True)

    def __str__(self):
        return self.user.username

    class Meta:
        verbose_name = "Отзыв"
        verbose_name_plural = "Отзывы"


class AdminReview(admin.ModelAdmin):
    """Класс управления отображения
        в админ панели сущности: Review"""


class Order(models.Model):
    """Модель заказа связи:
        с пользователем(FK),
           продуктом(М2М) карты(FK) статус(FK)"""

    STATUS_ORDER = [
        ("Оформлен", "Оформлен"),
        ("Ожидает оплату", "Ожидает оплату"),
        ("Оплачен", "Оплачен"),
        ("Подтвержден", "Подтвержден"),
        ("Выполнен", "Выполнен"),
        ("Аннулирован", "Аннулирован"),
        ("Ошибка оплаты", "Ошибка оплаты"),
    ]

    order_number = models.PositiveIntegerField(verbose_name='Номер заказа',
                                               unique=True)
    data_create = models.DateTimeField("Время заказа",
                                       auto_now_add=True)
    products = models.ManyToManyField("Product",
                                      verbose_name="Продукты",
                                      blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE,
                             verbose_name="Пользователь")
    check_order = models.FileField("Чек",
                                   upload_to="checks")
    total_price = models.DecimalField("Сумма заказа",
                                      max_digits=8, decimal_places=2)
    pay_card = models.ForeignKey("PayCard",
                                 on_delete=models.CASCADE,
                                 verbose_name="Карта",
                                 blank=True, null=True)
    order_status = models.CharField(verbose_name='Статус', max_length=15,
                                    choices=STATUS_ORDER, default=STATUS_ORDER[0][0])
    order_item = models.JSONField(verbose_name='Детали заказа')

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
    """Класс управления отображения
        в админ панели сущности: Order"""


class PayCard(models.Model):
    """Модель платежной карты связи:
        c пользователем(FK) заказ(FK)
       Payment card model, communication:
        user(FK), order(FK)"""

    card_number = models.CharField("Номер карты",
                                   max_length=16,
                                   unique=True)
    cvc = models.PositiveIntegerField("CVC")
    expiration_date = models.CharField("Дата окончания срока действия карты",
                                       max_length=5,
                                       default='')
    balance = models.DecimalField("Баланс на карте",
                                  max_digits=100,
                                  decimal_places=2,
                                  default=0)
    user = models.ForeignKey(User,
                             on_delete=models.CASCADE,
                             verbose_name="Пользователь")

    def __str__(self):
        return f"{self.card_number} {self.user.username}"

    class Meta:
        verbose_name = "Карточка"
        verbose_name_plural = "Карточки"


class AdminPayCard(admin.ModelAdmin):
    """Класс управления отображения в
        админ панели сущности: PayCard"""


class ArticleForOrders(models.Model):
    """Модель для хранения артикля для формирования номера заказа"""
    article = models.PositiveIntegerField()


class Profile(models.Model):
    """Модель профайла связана с User по FK"""
    user = models.OneToOneField(User,
                                on_delete=models.CASCADE,
                                verbose_name="Пользователь",
                                blank=True)
    phone_number = models.CharField(verbose_name="Номер телефона",
                                    max_length=18,
                                    blank=True)
    date_of_birth = models.DateField(verbose_name="Дата рождения",
                                     blank=True,
                                     null=True)
    city = models.CharField(verbose_name="Город",
                            max_length=120,
                            blank=True,
                            null=True)
    street = models.CharField(verbose_name="Улица / Переулок",
                              max_length=40,
                              blank=True,
                              null=True)
    house_number = models.CharField(verbose_name="Номер дома",
                                    max_length=4,
                                    blank=True,
                                    null=True)
    entrance_number = models.CharField(verbose_name="Номер подъезда",
                                       max_length=2,
                                       blank=True,
                                       null=True)
    apartment_number = models.CharField(verbose_name="Номер квартиры",
                                        max_length=4,
                                        blank=True,
                                        null=True)
    postal_code = models.CharField(verbose_name="Почтовый индекс",
                                   max_length=6,
                                   blank=True,
                                   null=True)

    def clean(self):
        """Проверка некоторых полей модели."""
        errors = {}

        if self.apartment_number and not self.apartment_number.isdigit():
            errors.update({'apartment_number': 'Номер квартиры должен быть из цифр.'})

        if self.postal_code and (len(self.postal_code) < 6 or not self.postal_code.isdigit()):
            errors.update({'postal_code': 'Не верный формат'})

        if errors:
            raise ValidationError(errors)

    class Meta:
        verbose_name_plural = 'Профили пользователей'
        verbose_name = 'Профиль пользователя'
        ordering = ['user']

    def __str__(self):
        return self.user.username
