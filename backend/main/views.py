from .serializers import SkillsSerializer, RolesSerializer, CoursesSerializer, ProgramAndBranchSerializer, ProfileSerializer
from .models import Skills, Roles, Courses, ProgramAndBranch
from rest_framework.filters import SearchFilter
from rest_framework.generics import ListAPIView


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
    serializer_class = CoursesSerializer
    search_fields = ['program', 'name', 'abbreviation']
    filter_backends = (SearchFilter,)
