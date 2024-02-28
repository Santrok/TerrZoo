# Generated by Django 5.0.2 on 2024-02-28 20:56

import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0008_remove_order_status_order_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='image',
            field=models.FileField(help_text='Изображение должно быть в формате avif,преобразовать можно <a href="https://imagetostl.com/ru/convert/file/jpg/to/avif">тут</a>', upload_to='articles_images', validators=[django.core.validators.FileExtensionValidator(['avif'])], verbose_name='Изображение'),
        ),
        migrations.AlterField(
            model_name='order',
            name='order_item',
            field=models.JSONField(verbose_name='Детали заказа'),
        ),
        migrations.AlterField(
            model_name='order',
            name='order_status',
            field=models.CharField(choices=[('Оформлен', 'Оформлен'), ('Ожидает оплату', 'Ожидает оплату'), ('Оплачен', 'Оплачен'), ('Подтвержден', 'Подтвержден'), ('Выполнен', 'Выполнен'), ('Аннулирован', 'Аннулирован'), ('Ошибка оплаты', 'Ошибка оплаты')], default='Оформлен', max_length=15, verbose_name='Статус'),
        ),
        migrations.AlterField(
            model_name='product',
            name='image_prev',
            field=models.FileField(help_text='Изображение должно быть в формате avif, преобразовать можно <a href="https://imagetostl.com/ru/convert/file/jpg/to/avif">тут</a>', upload_to='products_images', validators=[django.core.validators.FileExtensionValidator(['avif'])], verbose_name='Обязательное изображение'),
        ),
        migrations.AlterField(
            model_name='product',
            name='sale',
            field=models.ForeignKey(blank=True, help_text='Если товар не на акции, необходимо задать акцию с 0% скидки', null=True, on_delete=django.db.models.deletion.SET_NULL, to='main.sale', verbose_name='Товар на акции'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='phone_number',
            field=models.CharField(blank=True, max_length=18, verbose_name='Номер телефона'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='street',
            field=models.CharField(blank=True, max_length=40, null=True, verbose_name='Улица / Переулок'),
        ),
    ]
