# Generated by Django 5.0.2 on 2024-02-25 21:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_statusorder_order_status_order'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='StatusOrder',
            new_name='StatusesOrder',
        ),
        migrations.AlterModelOptions(
            name='statusesorder',
            options={'ordering': ['id'], 'verbose_name': 'Статус', 'verbose_name_plural': 'Статусы'},
        ),
    ]