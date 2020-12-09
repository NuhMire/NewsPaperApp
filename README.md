

# News App
## Usage


Run dev server with:
```bash
python manage.py runserver
```
## DB Examples
#### Get the name of a user by id 
```python
Users.objects.get(id=2).firstName
```

#### Get all liked articles of a user (by user id)
###### As a query set of objects
```python
Users.objects.get(id=2).likedArticles.all()
```
###### As a list of article ids
```python
list(Users.objects.get(id=2).likedArticles.values_list('id',flat=True))
```
#### Get all users who have liked an article (by article id)
###### As a query set of objects
```python
Articles.objects.get(id=15).likedBy.all()
```
###### As a list of user ids
```python
list(Articles.objects.get(id=15).likedBy.values_list('id',flat=True))
```

#### Get category name of an article (by article id)
```python
Articles.objects.get(id=15).category.name
```

#### Get all articles of a category (by category name)
###### As a query set of article objects
```python
Category.objects.get(name="Sport").articlesWithCategory.all()
```
###### As a list of article ids
```python
list(Category.objects.get(name="Sport").articlesWithCategory.values_list('id',flat=True))
```
