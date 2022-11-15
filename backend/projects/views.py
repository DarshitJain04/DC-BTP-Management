from .serializers import TypeSerializer, CategoriesSerializer, ProjectSerializer
from .models import Type, Categories, Project
from rest_framework.filters import SearchFilter
from rest_framework.generics import ListAPIView


class Type(ListAPIView):
    queryset = Type.objects.all()
    serializer_class = TypeSerializer
    search_fields = ['type']
    filter_backends = (SearchFilter,)


class Categories(ListAPIView):
    queryset = Categories.objects.all()
    serializer_class = CategoriesSerializer
    search_fields = ['category', 'total_credits_allowed']
    filter_backends = (SearchFilter,)


class Project(ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    search_fields = ['category', 'title', 'skills__skill', 'courses__course']
    filter_backends = (SearchFilter,)
