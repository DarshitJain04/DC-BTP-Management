from main.models import Student, Faculty, Skills, Courses
from rest_framework import status
from rest_framework.filters import SearchFilter
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Categories, Project, Type, Application, ApplicationCourse
from .serializers import (ApplicationSerializer, CategoriesSerializer,
                          ProjectSerializer, TypeSerializer, ApplicationCourseSerializer)


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


class ApplicationCourseCode(ListAPIView):
    queryset = ApplicationCourse.objects.all()
    serializer_class = ApplicationCourseSerializer
    search_fields = ['course_code', 'course_name']
    filter_backends = (SearchFilter,)


class AllProjectsClass(ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    search_fields = ['category', 'title', 'skills__skill', 'courses__course']
    filter_backends = (SearchFilter,)


# Projects floated by the you (Faculty) 
class ProjectsFloatedClass(APIView):
    permission_classes = (IsAuthenticated,)

    # Get all the projects floated by the you (Faculty)
    def get(self, request, pk = None, *args, **kwargs):
        faculty = Faculty.objects.get(user=request.user)
        if pk is not None:
            project = Project.objects.get(faculty=faculty, id=pk)
            return Response(ProjectSerializer(project).data, status=status.HTTP_200_OK)
        projects = Project.objects.filter(faculty=faculty)
        return Response(ProjectSerializer(projects, many=True).data, status=status.HTTP_200_OK)
    
    # Float a new project
    def post(self, request, *args, **kwargs):
        user = request.user
        data = {}
        for key in request.data.keys():
            data[key] = request.data.get(key)
        category = data.pop('category')
        skills = data.pop('skills')
        courses = data.pop('courses')
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
    
    # Update an existing project
    def put(self, request, pk, *args, **kwargs):
        data = {}
        user = request.user
        for key in request.data.keys():
            data[key] = request.data.get(key)
        title = data['title']
        category = data['category']
        description = data['description']
        deliverables = data['deliverables']
        active = data['active']
        skills = data['skills']
        courses = data['courses']
        faculty = Faculty.objects.get(user=user)
        category_obj = Categories.objects.get(category=category)
        project = Project.objects.get(faculty=faculty, id=pk)
        project.title = title
        project.category = category_obj
        project.description = description
        project.deliverables = deliverables
        
        if active == 'false':
            project.active = False
        else:
            project.active = True

        project.skills = skills
        project.courses = courses
        project.save()
        return Response(ProjectSerializer(project).data, status=status.HTTP_200_OK)
    
    # Delete an existing project
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


# Projects available to you (Student) (Apart from those applied for)
class AvailableProjectsClass(APIView):
    permission_classes = (IsAuthenticated,)

    def get_applied_projects(self, user):
        applications = Application.objects.filter(student__user=user)
        projects = Project.objects.filter(id__in=applications.values_list('project'), active=True)
        return projects

    def get(self, request, *args, **kwargs):
        projects = Project.objects.filter(active=True).difference(self.get_applied_projects(request.user))
        return Response(ProjectSerializer(projects, many=True).data, status=status.HTTP_200_OK)


# Get list of all the projects applied (From Student point of view)
class AppliedProjects(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        projects = Project.objects.filter(id__in=Application.objects.filter(student__user=user).values_list('project'), active=True)
        return Response(ProjectSerializer(projects, many=True).data, status=status.HTTP_200_OK)


# Create, Update, Delete and View Applications for projects (From Student point of view)
class StudentApplicationsClass(APIView):
    permission_classes = (IsAuthenticated,)

    # Get Application details you (Student) have applied for
    def get(self, request, pk = None, *args, **kwargs):
        student = Student.objects.get(user=request.user)
        if pk is not None:
            application = Application.objects.get(student=student, id=pk)
            return Response(ApplicationSerializer(application).data, status=status.HTTP_200_OK)
        applications = Application.objects.filter(student=student)
        return Response(ApplicationSerializer(applications, many=True).data, status=status.HTTP_200_OK)
    
    # Create new application for a project
    def post(self, request, *args, **kwargs):
        data = {}
        for key in request.data.keys():
            data[key] = request.data.get(key)
        student = Student.objects.get(user=request.user)
        application_type = Type.objects.get(application_type=data['application_type'])
        data.pop('application_type')
        project_id = data.pop('project_id')
        project = Project.objects.get(id=project_id)
        course = ApplicationCourse.objects.get(course_code=data['course_code'])
        data.pop('course_code')
        application = Application.objects.create(project=project, student=student, application_type=application_type, course_code=course, **data)
        return Response(ApplicationSerializer(application).data, status=status.HTTP_200_OK)
    
    # Update an existing application
    def put(self, request, pk = None, *args, **kwargs):
        data = {}
        for key in request.data.keys():
            data[key] = request.data.get(key)
        student = Student.objects.get(user=request.user)
        application_type = Type.objects.get(application_type=data['application_type'])
        data.pop('application_type')
        project_id = data.pop('project_id')
        project = Project.objects.get(id=project_id)
        course = ApplicationCourse.objects.get(course_code=data['course_code'])
        data.pop('course_code')
        currentApplication = Application.objects.filter(project=project, student=student, id=pk)
        if(currentApplication.is_accepted == False):
            _ = Application.objects.filter(project=project, student=student, id=pk).update(**data, application_type=application_type, course_code=course)
            application = Application.objects.get(id=pk, project=project, student=student, application_type=application_type)
            return Response(ApplicationSerializer(application).data, status=status.HTTP_200_OK)
        respone = {}
        respone['status'] = 'Can not update accepted applications. Please contact the concerned Faculty for the same.'
        return Response(respone, status=status.HTTP_200_OK)

    # Delete an existing application
    def delete(self, request, pk, *args, **kwargs):
        print(request)
        data = {}
        student = Student.objects.get(user=request.user)
        application = Application.objects.filter(id=pk, student=student)
        if(application.get().is_accepted == False):
            delete_application = application.delete()
            if delete_application:
                data["status"] = "Successfully deleted the application"
            else:
                data["status"] = "Failed to delete the application"
        else:
            data["status"] = "Can not delete accepted application"
        return Response(data=data)


# View all the applications to the projects floated (Faculty)
# Accept/ Reject applications for projects (Faculty)
class FacultyApplicationsClass(APIView):
    permission_classes = (IsAuthenticated,)

    # Get Application details you (Student) have applied for
    def get(self, request, pk = None, *args, **kwargs):
        faculty = Faculty.objects.get(user=request.user)
        if pk is not None:
            application = Application.objects.get(id=pk, project__faculty=faculty)
            return Response(ApplicationSerializer(application).data, status=status.HTTP_200_OK)
        applications = Application.objects.filter(project__faculty=faculty)
        return Response(ApplicationSerializer(applications, many=True).data, status=status.HTTP_200_OK)

    def put(self, request, pk = None, *args, **kwargs):
        faculty = Faculty.objects.get(user=request.user)
        if pk is not None:
            data = {}
            for key in request.data.keys():
                data[key] = request.data.get(key)

            is_accepted = data.pop('is_accepted')
            notes = data.pop('notes')
            application = Application.objects.get(id=pk, project__faculty=faculty)

            if is_accepted=='true':
                application.is_accepted = True
            else:
                application.is_accepted = False
            
            application.notes = notes

            application.save()

            return Response(ApplicationSerializer(application).data, status=status.HTTP_200_OK)
        applications = Application.objects.filter(project__faculty=faculty)
        return Response(ApplicationSerializer(applications, many=True).data, status=status.HTTP_200_OK)

    # TODO: Accept/ Reject Functionality


class ApplicationsForProject(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk, *args, **kwargs):
        faculty = Faculty.objects.get(user=request.user)
        project = Project.objects.get(faculty=faculty, id=pk)
        applications = Application.objects.filter(project=project)
        return Response(ApplicationSerializer(applications, many=True).data, status=status.HTTP_200_OK)
