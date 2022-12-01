from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Skills, Roles, Courses, ProgramAndBranch, Student, Faculty, FacultyAdvisor, DepartmentOffice, HeadOfDepartment


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email']


class SkillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skills
        fields = '__all__'


class RolesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roles
        fields = '__all__'


class CoursesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Courses
        fields = '__all__'


class ProgramAndBranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramAndBranch
        fields = '__all__'


class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    role = RolesSerializer(read_only=True)
    skills = SkillsSerializer(read_only=True, many=True)
    courses = CoursesSerializer(read_only=True, many=True)
    program_branch = ProgramAndBranchSerializer(read_only=True)

    class Meta:
        model = Student
        fields = '__all__'


class FacultySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    role = RolesSerializer(read_only=True)
    program_branch = ProgramAndBranchSerializer(read_only=True)

    class Meta:
        model = Faculty
        fields = '__all__'


class FacultyAdvisorSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    role = RolesSerializer(read_only=True)
    program_branch = ProgramAndBranchSerializer(read_only=True)

    class Meta:
        model = FacultyAdvisor
        fields = '__all__'


class DepartmentOfficeSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    role = RolesSerializer(read_only=True)
    program_branch = ProgramAndBranchSerializer(read_only=True)

    class Meta:
        model = DepartmentOffice
        fields = '__all__'


class HeadOfDepartmentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    role = RolesSerializer(read_only=True)
    program_branch = ProgramAndBranchSerializer(read_only=True)

    class Meta:
        model = HeadOfDepartment
        fields = '__all__'
