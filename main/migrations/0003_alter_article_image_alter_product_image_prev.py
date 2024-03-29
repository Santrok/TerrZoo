# Generated by Django 5.0.2 on 2024-02-25 11:13

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_alter_article_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='image',
            field=models.FileField(help_text='Изображение должно быть в формате avif,преобразовать можно здесь:https://imagetostl.com/ru/convert/file/jpg/to/avif', upload_to='articles_images', validators=[django.core.validators.FileExtensionValidator(['avif'])], verbose_name='Изображение'),
        ),
        migrations.AlterField(
            model_name='product',
            name='image_prev',
            field=models.FileField(blank=True, help_text='Изображение должно быть в формате avif,преобразовать можно здесь:https://imagetostl.com/ru/convert/file/jpg/to/avif', null=True, upload_to='products_images', validators=[django.core.validators.FileExtensionValidator(['avif'])], verbose_name='Обязательное изображение'),
        ),
    ]
