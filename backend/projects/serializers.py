from rest_framework import serializers
from django.contrib.auth.models import User
from main.models import Skills, Courses, ProgramAndBranch, Profile
from .models import Type, Categories, Project, Application


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email']


class SkillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skills
        fields = '__all__'


class CoursesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Courses
        fields = '__all__'


class ProgramAndBranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramAndBranch
        fields = '__all__'


class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = '__all__'


class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = '__all__'


class ProjectSerializer(serializers.ModelSerializer):
    category = CategoriesSerializer(read_only=True)
    skills = SkillsSerializer(read_only=True)
    courses = CoursesSerializer(read_only=True)
    class Meta:
        model = Project
        fields = '__all__'


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    program_branch = ProgramAndBranchSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = '__all__'


class ApplicationSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)
    project = ProjectSerializer(read_only=True)

    class Meta:
        model = Application
        fields = '__all__'
