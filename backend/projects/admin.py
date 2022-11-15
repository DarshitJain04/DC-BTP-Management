from django.contrib import admin
from .models import Type, Categories, Project, Application

admin.site.register(Type)
admin.site.register(Categories)
admin.site.register(Project)
admin.site.register(Application)