# Generated by Django 5.0.2 on 2024-03-11 14:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('manager_tasks', '0003_orderforanonymoususer'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='orderforanonymoususer',
            options={'verbose_name': 'Заказ анонимного пользователя', 'verbose_name_plural': 'Заказы анонимных пользователей'},
        ),
    ]