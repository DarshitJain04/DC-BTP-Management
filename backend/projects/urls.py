from django.urls import path
from . import views

app_name = 'projects'
urlpatterns = [    
    path('types/', views.Type.as_view(), name="types"),
    path('categories/', views.Categories.as_view(), name="categories"),
    path('projects/', views.Project.as_view(), name="projects"),
]
