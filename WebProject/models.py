from django.db import models
from django.db.models import Model

class Category(Model):
	name=models.CharField(max_length=100)
	
class Users(Model):
	firstName = models.CharField(max_length=50)
	lastName = models.CharField(max_length=50)
	email = models.EmailField(max_length=100)
	dob = models.DateField()
	password = models.CharField(max_length=50)
	profilePicture = models.ImageField(null=True, blank=True)
	isLoggedIn=models.BooleanField(default=False)
	favCategories=models.ManyToManyField(Category, blank=True,related_name='usersWithCategory')#related_name attribute specifies an identifier for the reverse relation

class Articles(Model):
	name=models.CharField(max_length=300)
	category=models.ForeignKey(Category, on_delete=models.CASCADE,related_name='articlesWithCategory') #The on_delete attribute here simply means that when a category is deleted, all articles of that category will also be deleted. This is required by django. 
	articleText = models.TextField()
	image_url = models.CharField(max_length=300,null=True, blank=True)
	likedBy=models.ManyToManyField(Users, blank=True,related_name='likedArticles')#related_name attribute specifies an identifier for the reverse relation

class Comments(Model):
	text=models.CharField(max_length=500)
	user=models.ForeignKey(Users,on_delete=models.CASCADE,related_name='userComments') #related_name attribute specifies an identifier for the reverse relation
	article=models.ForeignKey(Articles,on_delete=models.CASCADE,related_name='articleComments')#related_name attribute specifies an identifier for the reverse relation
	parentComment=models.ForeignKey('self',null=True, blank=True,on_delete=models.CASCADE,related_name='replies') #Necessary for I2 (comment replies). related_name attribute specifies an identifier for the reverse relation