# Generated by Django 5.0.2 on 2024-02-15 14:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('error_management', '0003_seterrordataapiv1_alter_seterrorlink_options_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='seterrordataapiv1',
            name='url_name',
            field=models.CharField(max_length=1500, unique=True, verbose_name='Название URL'),
        ),
    ]
