from main.models import Student, Faculty, Skills, Courses
from rest_framework import status
from rest_framework.filters import SearchFilter
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Categories, Project, Type, Application
from .serializers import (ApplicationSerializer, CategoriesSerializer,
                          ProjectSerializer, TypeSerializer)


class TypeClass(ListAPIView):
    queryset = Type.objects.all()
    serializer_class = TypeSerializer
    search_fields = ['type']
    filter_backends = (SearchFilter,)


class CategoriesClass(ListAPIView):
    queryset = Categories.objects.all()
    serializer_class = CategoriesSerializer
    search_fields = ['category', 'total_credits_allowed']
    filter_backends = (SearchFilter,)


class AllProjectsClass(ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    search_fields = ['category', 'title', 'skills__skill', 'courses__course']
    filter_backends = (SearchFilter,)


class ProjectsFloatedClass(APIView):
    permission_classes = (IsAuthenticated,)

    # From Faculty point of view: Projects floated by them
    def get(self, request, *args, **kwargs):
        faculty = Faculty.objects.get(user=request.user)
        projects = Project.objects.filter(faculty=faculty, active=True)
        return Response(ProjectSerializer(projects, many=True).data, status=status.HTTP_200_OK)
    
    def post(self, request, *args, **kwargs):
        user = request.user
        data = {}
        for key in request.data.keys():
            data[key] = request.data.get(key)
        category = data.pop('category')
        skills = data.pop('skills', [])
        courses = data.pop('courses', [])
        faculty = Faculty.objects.get(user=user)
        category = Categories.objects.get(category=category)
        project = Project.objects.create(faculty=faculty, category=category, **data)
        for skill in skills:
            skill, _ = Skills.objects.get_or_create(skill=skill)
            project.skills.add(skill)
        for course in courses:
            course, _ = Courses.objects.get_or_create(course=course)
            project.courses.add(course)
        project.save()
        return Response(ProjectSerializer(project).data, status=status.HTTP_200_OK)
    
    def put(self, request, pk, *args, **kwargs):
        data = {}
        user = request.user
        for key in request.data.keys():
            data[key] = request.data.get(key)
        category = data.pop('category')
        skills = data.pop('skills', [])
        courses = data.pop('courses', [])
        faculty = Faculty.objects.get(user=user)
        category = Categories.objects.get(category=category)
        _ = Project.objects.filter(faculty=faculty, id=pk).update(**data, category=category)
        project = Project.objects.get(faculty=faculty, category=category, id=pk)
        project.skills.clear()
        project.courses.clear()
        for skill in skills:
            skill, _ = Skills.objects.get_or_create(skill=skill)
            project.skills.add(skill)
        for course in courses:
            course, _ = Courses.objects.get_or_create(course=course)
            project.courses.add(course)
        project.save()
        return Response(ProjectSerializer(project).data, status=status.HTTP_200_OK)
    
    def delete(self, request, pk, *args, **kwargs):
        data = {}
        faculty = Faculty.objects.get(user=request.user)
        project = Project.objects.filter(faculty=faculty, id=pk)
        delete_project = project.delete()
        if delete_project:
            data["status"] = "Successfully deleted the project"
        else:
            data["status"] = "Failed to delete the project"
        return Response(data=data)


class AvailableProjectsClass(APIView):
    permission_classes = (IsAuthenticated,)

    def get_applied_projects(self, user):
        return Project.objects.filter(id__in=Application.objects.filter(student__user=user).values_list('project'), active=True)

    def get(self, request, *args, **kwargs):
        projects = Project.objects.filter(active=True).difference(self.get_applied_projects(request.user))
        return Response(ProjectSerializer(projects, many=True).data, status=status.HTTP_200_OK)


class AppliedProjects(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        projects = Project.objects.filter(id__in=Application.objects.filter(student__user=user).values_list('project'), active=True)
        return Response(ProjectSerializer(projects, many=True).data, status=status.HTTP_200_OK)


class ApplicationsClass(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        student = Student.objects.get(user=request.user)
        application = Application.objects.get(student=student)
        return Response(ApplicationSerializer(application).data, status=status.HTTP_200_OK)
