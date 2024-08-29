from django.urls import path
from account.views import UserRegistrationView
from account.views import UserLoginView,UserProfileView,UserChangePasswordView,UserPasswordResetView
urlpatterns = [
    path('register/', UserRegistrationView.as_view(),name='register'),
    path('login/', UserLoginView.as_view(),name='login'),
    path('profile/', UserProfileView.as_view(),name='profile'),
    path('changepassword/', UserChangePasswordView.as_view(),name='changepassword'),
    path('reset-password/', UserPasswordResetView.as_view(),name='reset-password'),
]