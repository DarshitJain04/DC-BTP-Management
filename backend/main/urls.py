from django.urls import path
from . import views

app_name = 'main'
urlpatterns = [
    path('skills/', views.Skills.as_view(), name="skills"),
    path('roles/', views.Roles.as_view(), name="roles"),
    path('courses/', views.Courses.as_view(), name="courses"),
    path('programs/', views.ProgramAndBranch.as_view(), name="program-and-branch"),
]
