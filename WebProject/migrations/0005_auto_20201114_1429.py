# Generated by Django 3.1.3 on 2020-11-14 14:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('WebProject', '0004_auto_20201114_1307'),
    ]

    operations = [
        migrations.AlterField(
            model_name='articles',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='articlesWithCategory', to='WebProject.category'),
        ),
        migrations.AlterField(
            model_name='articles',
            name='image_url',
            field=models.CharField(blank=True, max_length=300, null=True),
        ),
        migrations.AlterField(
            model_name='articles',
            name='likedBy',
            field=models.ManyToManyField(blank=True, related_name='likedComments', to='WebProject.Users'),
        ),
        migrations.AlterField(
            model_name='category',
            name='name',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='users',
            name='favCategories',
            field=models.ManyToManyField(blank=True, related_name='usersWithCategory', to='WebProject.Category'),
        ),
        migrations.CreateModel(
            name='Comments',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=500)),
                ('article', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='articleComments', to='WebProject.articles')),
                ('parentComment', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='replies', to='WebProject.comments')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='userComments', to='WebProject.users')),
            ],
        ),
    ]
