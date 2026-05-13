from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str

from django.core.mail import send_mail

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions

from .models import CustomUser
from .serializers import (
    RegisterSerializer,
    LoginSerializer,
    ProfileSerializer,
    ForgotPasswordSerializer,
    ResetPasswordSerializer,
)


# -------------------------
# Register View
# -------------------------
class RegisterView(APIView):

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully"})

        return Response(serializer.errors)

    # This helps the Browsable API render the form correctly
    serializer_class = RegisterSerializer

    def get(self, request):
        users = CustomUser.objects.all()
        # count the users
        user_count = users.count()
        # serialize the list of users
        serializer = ProfileSerializer(users, many=True)

        return Response({"total_users": user_count, "users": serializer.data})


# -------------------------
# Login View
# -------------------------
class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            return Response(serializer.validated_data)

        return Response(serializer.errors)


# -------------------------
# Profile View
# -------------------------
class ProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = ProfileSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        serializer = ProfileSerializer(request.user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Profile updated successfully", "data": serializer.data}
            )

        return Response(serializer.errors)


# -------------------------
# Forgot Password
# -------------------------
class ForgotPasswordView(APIView):
    def post(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)

        if serializer.is_valid():
            email = serializer.validated_data["email"]

            try:
                user = CustomUser.objects.get(email=email)

                uid = urlsafe_base64_encode(force_bytes(user.pk))

                token = default_token_generator.make_token(user)

                reset_link = f"http://localhost:3000/reset-password/{uid}/{token}"

                send_mail(
                    "Password Reset",
                    f"Click here to reset password: {reset_link}",
                    "admin@gmail.com",
                    [email],
                    fail_silently=False,
                )

                return Response({"message": "Reset email sent"})

            except CustomUser.DoesNotExist:
                return Response({"error": "User not found"})

        return Response(serializer.errors)


# -------------------------
# Reset Password
# -------------------------
class ResetPasswordView(APIView):
    def post(self, request, uidb64, token):
        serializer = ResetPasswordSerializer(data=request.data)

        if serializer.is_valid():
            try:
                uid = force_str(urlsafe_base64_decode(uidb64))

                user = CustomUser.objects.get(pk=uid)

                if default_token_generator.check_token(user, token):
                    user.set_password(serializer.validated_data["password"])
                    user.save()

                    return Response({"message": "Password reset successful"})

                return Response({"error": "Invalid token"})

            except:
                return Response({"error": "Something went wrong"})

        return Response(serializer.errors)
