# Generated by Django 5.0.6 on 2024-05-24 11:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0003_alter_book_image'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Book',
        ),
    ]