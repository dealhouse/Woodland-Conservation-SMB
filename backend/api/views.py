from django.shortcuts import render
from django.http import JsonResponse
import random
from django.conf import settings
from django.core.cache import cache
from django.core.mail import send_mail, EmailMessage
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils.decorators import method_decorator
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.throttling import AnonRateThrottle
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny
from .serializers import SendOtpSerializer, VerifyOtpSerializer, SendConfirmationSerializer

OTP_TTL_SECONDS = 600  # 10 minutes

def _otp_key(email: str) -> str:
    return f"otp:{email.lower()}"

def _generate_otp() -> str:
    return f"{random.randint(100000, 999999)}"

@api_view(["POST"])
@throttle_classes([AnonRateThrottle])  # basic rate-limit
def send_otp(request):
    serializer = SendOtpSerializer(data=request.data)
    if not serializer.is_valid():
        return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)

    email = serializer.validated_data["email"]
    otp = _generate_otp()
    cache.set(_otp_key(email), otp, timeout=OTP_TTL_SECONDS)

    subject = "Your OTP for Verification"
    text = f"Your OTP is {otp}. It will expire in 10 minutes."
    try:
        send_mail(subject, text, None, [email], fail_silently=False)
    except Exception as e:
        # Clean up if email send fails
        cache.delete(_otp_key(email))
        return Response({"error": "Failed to send OTP. Please try again."},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response({"message": "OTP sent successfully"}, status=status.HTTP_200_OK)

@api_view(["POST"])
def verify_otp(request):
    serializer = VerifyOtpSerializer(data=request.data)
    if not serializer.is_valid():
        return Response({"error": "Email and OTP are required"},
                        status=status.HTTP_400_BAD_REQUEST)

    email = serializer.validated_data["email"]
    otp = serializer.validated_data["otp"]

    cached = cache.get(_otp_key(email))
    if cached and cached == otp:
        cache.delete(_otp_key(email))
        return Response({"message": "OTP verified successfully"}, status=status.HTTP_200_OK)

    return Response({"error": "Invalid or expired OTP"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def send_confirmation(request):
    serializer = SendConfirmationSerializer(data=request.data)
    if not serializer.is_valid():
        return Response({"error": "All fields are required to send confirmation email"},
                        status=status.HTTP_400_BAD_REQUEST)

    data = serializer.validated_data
    email = data["email"]
    full_name = data["fullName"]
    inquiry_type = data["inquiryType"]
    message = data["message"]

    subject = "Confirmation of Your Inquiry"
    body = (
        f"Hello {full_name},\n\n"
        "Thank you for reaching out to us with your inquiry. Here are the details:\n\n"
        f"Inquiry Type: {inquiry_type}\n"
        f"Message: {message}\n\n"
        "We will get back to you as soon as possible.\n\n"
        "Best regards,\nThe Support Team"
    )
    try:
        EmailMessage(subject=subject, body=body, to=[email]).send(fail_silently=False)
    except Exception:
        return Response({"error": "Failed to send confirmation email"},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response({"message": "Confirmation email sent successfully"}, status=status.HTTP_200_OK)