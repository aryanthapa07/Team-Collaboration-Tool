from rest_framework import serializers
from account.models import User
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.contrib.auth import authenticate
from account.utils import Util
import re

class UserRegistrationSerializer(serializers.ModelSerializer):
  # We are writing this because we need confirm password field in our Registration Request
  password2 = serializers.CharField(style={'input_type':'password'}, write_only=True)
  class Meta:
    model = User
    fields=['email', 'name', 'password', 'password2', 'tc']
    extra_kwargs={
      'password':{'write_only':True}
    }

  def validate(self, attrs):
    password = attrs.get('password')
    # validating password length
    if len(password)<8:
      raise serializers.ValidationError("Password must be atleast 8 characters long")
    # validating presence of atleast one uppercase letter 
    if not re.search(r'[A-Z]',password):
      raise serializers.ValidationError("Password must contain atleast one uppercase letter")
    # validating presence of atleast one lowercase letter 
    if not re.search(r'[a-z]',password):
      raise serializers.ValidationError("Password must contain atleast one lowercase letter")
    # validating presence of atleast one digit  
    if not re.search(r'\d', password):
      raise serializers.ValidationError("Password must contain at least one digit")
    # validating presence of atleast one special character  
    if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
      raise serializers.ValidationError("Password must contain at least one special character")
    password2 = attrs.get('password2')
    # Validating Password and Confirm Password while Registration
    if password != password2:
      raise serializers.ValidationError("Password and Confirm Password doesn't match")
    return attrs

  def create(self, validate_data):
    return User.objects.create_user(**validate_data)

# user login serializer
class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)
    password = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['email', 'password']

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        # Check if the email exists in the database
        if not User.objects.filter(email=email).exists():
            raise serializers.ValidationError({"non_field_errors": "User with this email doesn't exist"})
        # Authenticate user
        user = authenticate(email=email, password=password)
        # Check if the password is correct
        if user is None:
            raise serializers.ValidationError({"non_field_errors": "Entered password is wrong"})
        attrs['user'] = user
        return attrs

# user profile serializer
class UserProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'email', 'name']

# change password serializer
class UserChangePasswordSerializer(serializers.Serializer):
  password = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  password2 = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  class Meta:
    fields = ['password', 'password2']

  def validate(self, attrs):
    password = attrs.get('password')
    password2 = attrs.get('password2')
    user = self.context.get('user')
    if password != password2:
      raise serializers.ValidationError("Password and Confirm Password doesn't match")
    user.set_password(password)
    user.save()
    return attrs
# send password reset email serializer
class SendPasswordResetEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)

    class Meta:
        fields = ['email']

    def validate(self, attrs):
        email = attrs.get('email')
        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            uid = urlsafe_base64_encode(force_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            reset_link = f'http://localhost:5173//reset-password/{uid}/{token}/'
            body = f'Click the following link to reset your password: {reset_link}'
            data = {
                'subject': 'Reset Your Password',
                'body': body,
                'to_email': user.email
            }
            Util.send_email(data)
        else:
            raise serializers.ValidationError("User with this email doesn't exist")
        return attrs

# password reset serializer
class UserPasswordResetSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
    password2 = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)

    class Meta:
        fields = ['password', 'password2']

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            password2 = attrs.get('password2')
            uid = self.context.get('uid')
            token = self.context.get('token')
            id = smart_str(urlsafe_base64_decode(uid))
            user = User.objects.get(id=id)
            if len(password)<8:
              raise serializers.ValidationError("Password must be atleast 8 characters long")
            # validating presence of atleast one uppercase letter 
            if not re.search(r'[A-Z]',password):
              raise serializers.ValidationError("Password must contain atleast one uppercase letter")
            # validating presence of atleast one lowercase letter 
            if not re.search(r'[a-z]',password):
              raise serializers.ValidationError("Password must contain atleast one lowercase letter")
            # validating presence of atleast one digit  
            if not re.search(r'\d', password):
              raise serializers.ValidationError("Password must contain at least one digit")
            # validating presence of atleast one special character  
            if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
              raise serializers.ValidationError("Password must contain at least one special character")
            if password != password2:
                raise serializers.ValidationError("Password and Confirm Password doesn't match")
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise serializers.ValidationError("Token is not valid or has expired")
            user.set_password(password)
            user.save()
            return attrs
        except DjangoUnicodeDecodeError as identifier:
          PasswordResetTokenGenerator().check_token(user, token)
          raise serializers.ValidationError('Token is not Valid or Expired')