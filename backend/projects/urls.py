from django.urls import path
from . import views

app_name = 'projects'
urlpatterns = [    
    path('types/', views.TypeClass.as_view(), name="types"),
    path('categories/', views.CategoriesClass.as_view(), name="categories"),
    path('projects_floated/', views.ProjectsFloatedClass.as_view(), name="projects-floated"),
    path('project_floated/<int:pk>', views.ProjectsFloatedClass.as_view(), name="project-floated"),
    path('available_projects/', views.AvailableProjectsClass.as_view(), name="available-projects"),
    path('applications/', views.ApplicationsClass.as_view(), name="applications"),
]
