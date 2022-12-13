from django.urls import path
from . import views

app_name = 'projects'
urlpatterns = [    
    path('types/', views.TypeClass.as_view(), name="types"),
    path('categories/', views.CategoriesClass.as_view(), name="categories"),
    path('application_course_codes/', views.ApplicationCourseCode.as_view(), name="application-course-code"),
    path('projects_floated/', views.ProjectsFloatedClass.as_view(), name="projects-floated"),
    path('projects_floated/<int:pk>', views.ProjectsFloatedClass.as_view(), name="projects-floated"),
    path('available_projects/', views.AvailableProjectsClass.as_view(), name="available-projects"),
    path('student_applications/', views.StudentApplicationsClass.as_view(), name="student-applications"),
    path('student_applications/<int:pk>', views.StudentApplicationsClass.as_view(), name="student-applications"),
    path('faculty_applications/', views.FacultyApplicationsClass.as_view(), name="faculty-applications"),
    path('faculty_applications/<int:pk>', views.FacultyApplicationsClass.as_view(), name="faculty-applications"),
    path('applications_project/<int:pk>', views.ApplicationsForProject.as_view(), name="applications-project"),
]
