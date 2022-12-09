from rest_framework import serializers
from .models import Type, Categories, Project, Application, ApplicationCourse
from main.serializers import SkillsSerializer, CoursesSerializer, StudentSerializer, FacultySerializer


class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = '__all__'


class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = '__all__'


class ProjectSerializer(serializers.ModelSerializer):
    faculty = FacultySerializer(read_only=True)
    category = CategoriesSerializer(read_only=True)
    skills = SkillsSerializer(read_only=True, many=True)
    courses = CoursesSerializer(read_only=True, many=True)
    
    class Meta:
        model = Project
        fields = '__all__'


class ApplicationCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplicationCourse
        fields = '__all__'

class ApplicationSerializer(serializers.ModelSerializer):
    student = StudentSerializer(read_only=True)
    project = ProjectSerializer(read_only=True)
    application_type = TypeSerializer(read_only=True)
    course_code = ApplicationCourseSerializer(read_only=True)

    class Meta:
        model = Application
        fields = '__all__'
