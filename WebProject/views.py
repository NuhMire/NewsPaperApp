from django.shortcuts import render, redirect
from .forms import RegisterForm,LoginForm
from .models import Users
from django.http import HttpResponse, Http404, QueryDict
from .models import Users,Articles,Comments,Category
from django.http import HttpResponse, JsonResponse,Http404,QueryDict
import json
from django.core import serializers
from django.core.mail import EmailMessage

# Create your views here.
def register(response):
	form = RegisterForm()
	return render(response, "register.html", {"form":form,"LoginForm":LoginForm(label_suffix="")},)

def selectCategories(response):
	return render(response, "selectCategories.html",{
        'category' : Category.objects.all(),
    })

def homepage(response):
        return render(response, "homepage.html",{
    })

def regPost(request):
    if request.method == 'POST':
        firstNameVal = request.POST.get('firstName')
        lastNameVal = request.POST.get('lastName')
        emailVal = request.POST.get('email')
        dobVal = request.POST.get('dob')
        passwordVal = request.POST.get('password')
        response_data = {}
        if len(list(Users.objects.filter(email=emailVal)))>0:
            response_data['result'] = 'AlreadyEmail'
            return HttpResponse(
                json.dumps(response_data),
                content_type="application/json"
            )
        newUser = Users(firstName=firstNameVal, lastName=lastNameVal,email=emailVal,dob=dobVal,password=passwordVal,isLoggedIn=False,profilePicture='blankimg.png');
        newUser.save()
        email = EmailMessage(
            'Thank you for Registering',
            'Hi there! Thank you for registering and welcome to our News24 web app!',
            'noreply@news24.com',
            [emailVal]
        )
        email.send(fail_silently=False)
        response_data['result'] = 'Success'
        return HttpResponse(
            json.dumps(response_data),
            content_type="application/json"
        )
    else:
        return HttpResponse(
            json.dumps({""}),
            content_type="application/json"
        )

def retrieve(request):
    if request.method == 'POST':
        userId = request.POST.get('iduser')
        liked=list(Users.objects.get(id=userId).likedArticles.values_list('id',flat=True))
        articles=[]
        for x in list(Users.objects.get(id=userId).favCategories.values_list('id',flat=True)):
            articles.append(["CAT",Category.objects.get(id=x).name])
            articles.extend(list(Articles.objects.filter(category=x).values()))
        return HttpResponse(
            json.dumps({'homeArt':articles,'liked':liked},default=str),
            content_type="application/json"
        )

def eachCat(response,cat):
    if cat.isnumeric():
        return render(response, "eachCat.html",{'article' :Articles.objects.filter(likedBy=cat) ,'cat':'Favourite'})
    return render(response, "eachCat.html",{'article' : Articles.objects.filter(category=Category.objects.get(name=cat).id),'cat':cat})


def likeArticle(request):
    response_data = {}
    print("behind like Article")
    articleId = request.POST.get('articleId')
    userId = request.POST.get('userId')
    changeType = request.POST.get('type')
    print("article" + articleId)
    articleObject = Articles.objects.get(id=articleId)
    userObject = Users.objects.get(id=userId)
    if changeType=="like":
        articleObject.likedBy.add(userObject)
    elif changeType=="unlike":
        articleObject.likedBy.remove(userObject)
    articleObject.save()
    response_data['result'] = "SuccessfulPost"
    return HttpResponse(
        json.dumps('response_data'),
        content_type="application/json"
        )


def articleLikedBy(request):
    print("behind likeBy artice")
    articleId = request.POST.get('articleId')
    usersWhoLiked=[]
    for x in list(Articles.objects.get(id=articleId).likedBy.values()):
        usersWhoLiked.append("<li class='list-group-item list-group-item list-group-item-primary'>"+x['firstName']+" "+x['lastName']+"</li>")
    return JsonResponse({
        'data': usersWhoLiked,
    })

def tosendBack(iduser):
    response_data={}
    response_data['userFields'] = Users.objects.filter(id=iduser).values()[0]
    response_data['favCategories']=list(Users.objects.get(id=iduser).favCategories.values_list('name',flat=True))
    response_data['imgsrc']=Users.objects.filter(id=iduser)[0].profilePicture.url
    return response_data

def postFavourite(request):
    response_data = {}
    print("behind POST favourite")
    categoryName = request.POST.get('item')
    iduser = int(request.POST.get('useid'))
    categoryObject = Category.objects.get(name=categoryName)
    userObject = Users.objects.get(id=iduser)
    userObject.favCategories.add(categoryObject)
    userObject.save()
    response_data=tosendBack(iduser)
    response_data['result'] = "SuccessfulLogin"
    return HttpResponse(
        json.dumps(response_data,default=str),
        content_type="application/json"
    )

def unFavourite(request):
    print("behind POST favourite")
    categoryName = request.POST.get('item')
    iduser = int(request.POST.get('useid'))
    categoryObject = Category.objects.get(name=categoryName)
    userObject = Users.objects.get(id=iduser)
    userObject.favCategories.remove(categoryObject)
    userObject.save()
    response_data=tosendBack(iduser)
    response_data['result'] = "SuccessfulLogin"
    return HttpResponse(
        json.dumps(response_data,default=str),
        content_type="application/json"
    )
    
def loginPost(request):
    if request.method == 'POST':
        emailVal = request.POST.get('email')
        passwordVal = request.POST.get('password')
        response_data = {}

        if Users.objects.filter(email = emailVal).exists():
            if Users.objects.filter(email = emailVal).values_list('password',flat=True)[0]==passwordVal:
                response_data=tosendBack(Users.objects.get(email = emailVal).id)
                response_data['result'] = "SuccessfulLogin"
                return HttpResponse(
                    json.dumps(response_data,default=str),
                    content_type="application/json"
                )
            else:        
                response_data['result'] = "LoginError"
                return HttpResponse(
                    json.dumps(response_data),
                    content_type="application/json"
                )
        else:        
            response_data['result'] = 'LoginError'
            return HttpResponse(
                json.dumps(response_data),
                content_type="application/json"
            )
    else:
        return HttpResponse(
            json.dumps({""}),
            content_type="application/json"
        )

def profile(response):
    return render(response, "profile.html", {"User":Users.objects.values()})

def updateProfile(request):
    if request.method == 'POST':
        if 'email' in request.POST:
            iduser = int(request.POST.get('useid'))
            firstNameVal = request.POST.get('firstName') 
            lastNameVal = request.POST.get('lastName') 
            emailVal = request.POST.get('email') 
            obj = Users.objects.get(id=iduser)
            obj.firstName = firstNameVal
            obj.lastName = lastNameVal
            obj.email = emailVal
            obj.save()
            response_data={}
            response_data=tosendBack(iduser)
            response_data['result'] = "SuccessfulUpdate"
            return HttpResponse(
                json.dumps(response_data,default=str),
                content_type="application/json"
            )
        else:
            iduser = int(request.POST.get('useid'))
            img=request.FILES['theFile']
            obj = Users.objects.get(id=iduser)
            obj.profilePicture=img
            obj.save()
            response_data=tosendBack(iduser)
            response_data['result'] = "SuccessfulUpdatePP"
            return HttpResponse(
                json.dumps(response_data,default=str),
                content_type="application/json"
            )
    if request.method == 'DELETE':
        body=json.loads(request.body)
        iduser = body.get('useid')
        obj = Users.objects.get(id=iduser)
        obj.profilePicture='blankimg.png'
        obj.save()
        response_data=tosendBack(iduser)
        response_data['result'] = "SuccessfulDeletePP"
        return HttpResponse(
            json.dumps(response_data,default=str),
            content_type="application/json"
        )

def commPost(request):
    response_data={}
    if request.is_ajax and request.method == "POST":
        articleIdVal = int(request.POST.get('arId'))
        parentIdVal = int(request.POST.get('parId'))
        if (parentIdVal<1):
            parentIdVal=None
        userIdVal = int(request.POST.get('usId'))
        textVal = request.POST.get('txt')
        if parentIdVal!=None:
            newComment = Comments(article=Articles.objects.get(id=articleIdVal),parentComment=Comments.objects.get(id=parentIdVal),user=Users.objects.get(id=userIdVal),text=textVal);
        else:
            newComment = Comments(article=Articles.objects.get(id=articleIdVal),user=Users.objects.get(id=userIdVal),text=textVal);
        newComment.save()
        response_data['result'] = 'success'
        return HttpResponse(
            json.dumps(response_data),
            content_type="application/json"
        )

def commPut(request):
    response_data={}
    if request.is_ajax and request.method == "PUT":
        body = json.loads(request.body)
        commid = int(body.get('coid'))
        textVal = body.get('txt')
        changeComment=Comments.objects.get(id=commid)
        changeComment.text=textVal
        changeComment.save()
        response_data['result'] = 'success'
        return HttpResponse(
            json.dumps(response_data),
            content_type="application/json"
        )

def commDelete(request):
    response_data={}
    if request.is_ajax and request.method == "DELETE":
        body = json.loads(request.body)
        commid = int(body.get('coid'))
        delComm=Comments.objects.get(id=commid)
        delComm.delete()
        response_data['result'] = 'success'
        return HttpResponse(
            json.dumps(response_data),
            content_type="application/json"
        )

def GETComments(request,articleId):
    if request.is_ajax and request.method == "GET":
        res=[]
        visited={}
        def visit(commid,step):
            visited[commid]=True
            dic={}
            dic['id']=commid
            dic['commText']=Comments.objects.get(id=commid).text
            dic['name']=Users.objects.filter(id=Comments.objects.get(id=commid).user_id)[0].firstName +' '+ Users.objects.filter(id=Comments.objects.get(id=commid).user_id)[0].lastName
            dic['step']=step
            dic['writerID']=Comments.objects.get(id=commid).user_id
            dic['profilePicture']=Users.objects.filter(id=Comments.objects.get(id=commid).user_id)[0].profilePicture.url
            res.append(dic)
            replies=list(Comments.objects.filter(parentComment=commid).values_list('id',flat=True))
            for y in replies:
                visit(y,step+1)
        for x in Articles.objects.get(id=articleId).articleComments.all().values():
            if x['id'] not in visited:
                visit(x['id'],1)
        return JsonResponse({"success":True, "allComments":res})