from django.db import models
from main.models import Skills, Courses, Profile


class Type(models.Model):
    PROJECT_TYPE = (
        ('Design Credits', 'Design Credits'),
        ('B.Tech. Project', 'B.Tech. Project')
    )
    type = models.CharField(max_length=20, choices=PROJECT_TYPE, default='Design Credits')

    class Meta:
        verbose_name = 'Project Type'
        verbose_name_plural = 'Project Type'

    def __str__(self):
        return self.type


class Categories(models.Model):
    CATEGORIES = (
        ('Category 1', 'Category 1'),
        ('Category 2', 'Category 2'),
        ('Category 3', 'Category 3'),
        ('Category 4', 'Category 4'),
        ('Category 5', 'Category 5'),
        ('Category 6', 'Category 6'),
        ('B.Tech. Project', 'B.Tech. Project')
    )
    category = models.CharField(max_length=20, choices=CATEGORIES, default='Category 1')
    description = models.TextField(default='')
    total_credits_allowed = models.SmallIntegerField()

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.category


class Project(models.Model):
    category = models.ForeignKey(Categories, on_delete=models.PROTECT)
    title = models.CharField(max_length=255)
    description = models.TextField()
    deliverables = models.TextField()
    skills = models.ManyToManyField(Skills, blank=True)
    courses = models.ManyToManyField(Courses, blank=True)

    class Meta:
        verbose_name = 'Project'
        verbose_name_plural = 'Projects'

    def __str__(self):
        return self.title


class Application(models.Model):
    project = models.OneToOneField(Project, on_delete=models.CASCADE)
    student = models.OneToOneField(Profile, on_delete=models.CASCADE)
    is_accepted = models.BooleanField(default=False)
    notes = models.TextField(blank=True)

    def __str__(self):
        return str(self.project.title) + " (" + str(self.student.user.roll_number) + ")" 