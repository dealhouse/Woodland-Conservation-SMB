from rest_framework import serializers

class SendOtpSerializer(serializers.Serializer):
    email = serializers.EmailField()

class SendConfirmationSerializer(serializers.Serializer):
    email = serializers.EmailField()
    fullName = serializers.CharField(max_length=200)
    inquiryType = serializers.CharField(max_length=200)
    message = serializers.CharField()

class VerifyOtpSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(min_length=6, max_length=6)

