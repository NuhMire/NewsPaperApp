from django import forms
from .models import Users


class RegisterForm(forms.ModelForm):
	class Meta:
		model=Users
		fields = ['firstName', 'lastName','email','dob','password']
		widgets = {
            'firstName': forms.TextInput(attrs={
                'id': 'firstName-text', 
                'required': True, 
            }),
            'lastName': forms.TextInput(attrs={
                'id': 'lastName-text', 
                'required': True, 
            }),
            'email': forms.EmailInput(attrs={
                'id': 'email-text', 
                'required': True, 
            }),
			'dob': forms.DateInput(format=('%d %B, %Y'), attrs={'class': 'datepicker','id':'dob-text','required':True,'type':'date'}),
            'password': forms.PasswordInput(attrs={
                'id': 'password-text', 
                'required': True, 
            }),                         
            }
class LoginForm(forms.ModelForm):
    class Meta:
        model=Users
        fields=['email','password']
        labels = {
        "email": "Enter Email\xa0\xa0","password": "Enter Password\xa0\xa0"
        }
        widgets = {
        'email': forms.EmailInput(attrs={
            'id': 'email-login-text', 
            'required': True, 
        }),
        'password': forms.PasswordInput(attrs={
            'id': 'password-login-text', 
            'required': True, 
        }),                         
        }