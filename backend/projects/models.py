from django.db import models
from main.models import Skills, Courses, Student, Faculty


class Type(models.Model):
    PROJECT_TYPE = (
        ('Design Credits', 'Design Credits'),
        ('B.Tech. Project', 'B.Tech. Project')
    )
    application_type = models.CharField(max_length=20, choices=PROJECT_TYPE, default='Design Credits')

    class Meta:
        verbose_name = 'Project Type'
        verbose_name_plural = 'Project Type'

    def __str__(self):
        return self.application_type


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
    faculty = models.ForeignKey(Faculty, on_delete=models.PROTECT)
    category = models.ForeignKey(Categories, on_delete=models.PROTECT)
    title = models.CharField(max_length=255)
    description = models.TextField()
    deliverables = models.TextField()
    skills = models.TextField(blank=True)
    courses = models.TextField(blank=True)
    active = models.BooleanField(default=True)
    class Meta:
        verbose_name = 'Project'
        verbose_name_plural = 'Projects'

    def __str__(self):
        return self.title


class ApplicationCourse(models.Model):
    course_code = models.CharField(max_length=10)
    course_name = models.CharField(max_length=50)

    def __str__(self):
        return (self.course_code + ' (' + self.course_name + ')')


class Application(models.Model):
    project = models.OneToOneField(Project, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    application_type = models.ForeignKey(Type, on_delete=models.PROTECT)
    course_code = models.ForeignKey(ApplicationCourse, on_delete=models.PROTECT)
    is_accepted = models.BooleanField(default=False)
    resume_link = models.TextField(blank=True, null=True)
    notes = models.TextField(blank=True)

    def __str__(self):
        return str(self.project.title) + " (" + str(self.student.roll_number) + ")" 