# Generated by Django 5.0.6 on 2024-05-24 09:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0002_alter_book_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='image',
            field=models.ImageField(default='images/default/default.png', upload_to='images/%y/%m'),
        ),
    ]
