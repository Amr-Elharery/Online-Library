from django.urls import path
from . import views

urlpatterns = [
    path('', views.users, name="users"),
    path('<int:id>/', views.user, name="user"),
    path('login/', views.login, name="login"),
]
