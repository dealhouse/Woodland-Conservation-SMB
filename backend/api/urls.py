from django.urls import path, include
from . import views



urlpatterns = [
    # path('ping/', views.ping, name='ping'),
    path('send-otp', views.send_otp, name='send-otp'),
    path('verify-otp', views.verify_otp, name='verify-otp'),
    path('send-confirmation', views.send_confirmation, name='send-confirmation'),
    path('sightings/', views.sightings),
    path('important-locations/', views.important_locations),
]

