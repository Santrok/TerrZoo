# Generated by Django 5.0.2 on 2024-02-29 15:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0011_alter_articlefororders_article'),
    ]

    operations = [
        migrations.AlterField(
            model_name='articlefororders',
            name='article',
            field=models.PositiveIntegerField(),
        ),
    ]
