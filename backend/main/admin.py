from django.contrib import admin
from .models import Skills, Roles, Courses, ProgramAndBranch, StudentProfile, FacultyProfile

admin.site.register(Skills)
admin.site.register(Roles)
admin.site.register(Courses)
admin.site.register(ProgramAndBranch)
admin.site.register(StudentProfile)
admin.site.register(FacultyProfile)