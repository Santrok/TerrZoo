# Generated by Django 5.0.2 on 2024-03-11 08:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0012_alter_articlefororders_article'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='order_show',
            field=models.BooleanField(default=True, verbose_name='Показывать заказ пользователю '),
        ),
    ]
