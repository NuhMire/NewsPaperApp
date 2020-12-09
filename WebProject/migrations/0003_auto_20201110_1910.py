# Generated by Django 3.1.3 on 2020-11-10 19:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('WebProject', '0002_users_isloggedin'),
    ]

    operations = [
        migrations.RenameField(
            model_name='users',
            old_name='isloggedin',
            new_name='isLoggedIn',
        ),
        migrations.CreateModel(
            name='Articles',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=300)),
                ('category', models.CharField(max_length=50)),
                ('articleText', models.TextField()),
                ('image_url', models.CharField(max_length=300)),
                ('likedBy', models.ManyToManyField(to='WebProject.Users')),
            ],
        ),
    ]