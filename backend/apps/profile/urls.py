from django.urls import path

from .views import portfolio_profile

urlpatterns = [
    path('profile/', portfolio_profile, name='portfolio-profile'),
]
