# Generated by Django 3.1.3 on 2020-11-24 21:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('WebProject', '0006_auto_20201114_1557'),
    ]

    operations = [
        migrations.AddField(
            model_name='users',
            name='profilePicture',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]