# Generated by Django 5.0.2 on 2024-02-29 15:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0009_alter_article_image_alter_order_order_item_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='order_show',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='order_number',
            field=models.CharField(max_length=15, verbose_name='Номер заказа'),
        ),
    ]