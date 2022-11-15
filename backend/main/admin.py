from django.contrib import admin
from .models import Skills, Roles, Courses, ProgramAndBranch, Profile

admin.site.register(Skills)
admin.site.register(Roles)
admin.site.register(Courses)
admin.site.register(ProgramAndBranch)
admin.site.register(Profile)