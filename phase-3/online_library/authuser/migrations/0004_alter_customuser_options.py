# Generated by Django 5.0.6 on 2024-06-17 12:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authuser', '0003_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='customuser',
            options={'verbose_name': 'user', 'verbose_name_plural': 'users'},
        ),
    ]
