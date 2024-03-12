# Generated by Django 5.0.2 on 2024-03-11 14:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('manager_tasks', '0002_alter_callback_options'),
    ]

    operations = [
        migrations.CreateModel(
            name='OrderForAnonymousUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order_number', models.CharField(max_length=16, verbose_name='Номер заказа')),
                ('order_status', models.CharField(choices=[('Оформлен', 'Оформлен'), ('Ожидает оплату', 'Ожидает оплату'), ('Оплачен', 'Оплачен'), ('Подтвержден', 'Подтвержден'), ('Выполнен', 'Выполнен'), ('Аннулирован', 'Аннулирован'), ('Ошибка оплаты', 'Ошибка оплаты')], default='Оформлен', max_length=15, verbose_name='Статус')),
                ('order_item', models.JSONField(verbose_name='Детали заказа')),
                ('data_create', models.DateTimeField(auto_now_add=True, verbose_name='Время заказа')),
                ('total_price', models.DecimalField(decimal_places=2, max_digits=8, verbose_name='Сумма заказа')),
            ],
        ),
    ]