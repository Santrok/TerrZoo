# Generated by Django 5.0.2 on 2024-02-21 12:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('error_management', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='seterrorlink',
            name='html_id_tag_a',
            field=models.CharField(help_text='Выберите из элемента a в HTML на странице значение атрибута id', max_length=255, verbose_name="Class HTML тег <a class='class элемента' ></a> разметки"),
        ),
    ]