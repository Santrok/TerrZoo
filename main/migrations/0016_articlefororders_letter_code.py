# Generated by Django 5.0.2 on 2024-03-13 23:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0015_alter_order_order_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='articlefororders',
            name='letter_code',
            field=models.CharField(default=1, max_length=2),
            preserve_default=False,
        ),
    ]
