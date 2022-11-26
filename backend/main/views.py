from .serializers import SkillsSerializer, RolesSerializer, CoursesSerializer, ProgramAndBranchSerializer, StudentSerializer, FacultySerializer, FacultyAdvisorSerializer, DepartmentOfficeSerializer, HeadOfDepartmentSerializer
from .models import Skills, Roles, Courses, ProgramAndBranch, Student, Faculty, FacultyAdvisor, DepartmentOffice, HeadOfDepartment
from rest_framework.filters import SearchFilter
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated


class Skills(ListAPIView):
    queryset = Skills.objects.all()
    serializer_class = SkillsSerializer
    search_fields = ['skill']
    filter_backends = (SearchFilter,)


class Roles(ListAPIView):
    queryset = Roles.objects.all()
    serializer_class = RolesSerializer
    search_fields = ['role']
    filter_backends = (SearchFilter,)


class Courses(ListAPIView):
    queryset = Courses.objects.all()
    serializer_class = CoursesSerializer
    search_fields = ['course']
    filter_backends = (SearchFilter,)


class ProgramAndBranch(ListAPIView):
    queryset = ProgramAndBranch.objects.all()
    serializer_class = ProgramAndBranchSerializer
    search_fields = ['program', 'name', 'abbreviation']
    filter_backends = (SearchFilter,)


class StudentProfile(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        user = request.user
        student = Student.objects.get(user=user)
        serializer = StudentSerializer(student)
        data = serializer.data
        return Response(data, status=status.HTTP_200_OK)


class FacultyProfile(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        user = request.user
        faculty = Faculty.objects.get(user=user)
        serializer = FacultySerializer(faculty)
        data = serializer.data
        return Response(data, status=status.HTTP_200_OK)


class FacultyAdvisorProfile(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        user = request.user
        faculty_advisor = FacultyAdvisor.objects.get(user=user)
        serializer = FacultyAdvisorSerializer(faculty_advisor)
        data = serializer.data
        return Response(data, status=status.HTTP_200_OK)


class DepartmentOfficeProfile(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        user = request.user
        department_office = DepartmentOffice.objects.get(user=user)
        serializer = DepartmentOfficeSerializer(department_office)
        data = serializer.data
        return Response(data, status=status.HTTP_200_OK)


class HeadOfDepartmentProfile(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        user = request.user
        head_of_departmenr = HeadOfDepartment.objects.get(user=user)
        serializer = HeadOfDepartmentSerializer(head_of_departmenr)
        data = serializer.data
        return Response(data, status=status.HTTP_200_OK)
