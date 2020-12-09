from django.contrib import admin
from django.urls import path
from . import views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('', views.register, name='register'),
	path('register/', views.register, name='register'),
	path('register/regPost/', views.regPost, name='regPost'),
	path('selectcategories/', views.selectCategories, name='selectCategories'),
	path('homepage/', views.homepage, name='homepage'),
	path('likeArticle/', views.likeArticle, name='likeArticle'),
    path('retrieve/', views.retrieve, name='retrieve'), 
	path('articleLikedBy/', views.articleLikedBy, name='articleLikedBy'),
	path('get<str:cat>/', views.eachCat, name='getCat'), 
	path('postFavourite', views.postFavourite, name='postFavourite'),
	path('unFavourite', views.unFavourite, name='unFavourite'),
	path('loginPost/', views.loginPost, name='loginPost'),
    path('admin/', admin.site.urls),
	path('profile/', views.profile, name='profile'),
	path('profile/updateProfile/', views.updateProfile, name='updateProfile'),
    path('commPost/',views.commPost,name="commPost"),
	path('commPut/',views.commPut,name="commPut"),
	path('commDelete/',views.commDelete,name="commDelete"),
	path('GETComments/<int:articleId>/',views.GETComments,name="commentGET"), 
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
