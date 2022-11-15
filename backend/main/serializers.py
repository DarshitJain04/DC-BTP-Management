from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Skills, Roles, Courses, ProgramAndBranch, Profile


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


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    program_branch = ProgramAndBranchSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = '__all__'
