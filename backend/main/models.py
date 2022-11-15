from django.db import models
from django.contrib.auth.models import User


class Skills(models.Model):
    skill = models.CharField(max_length=60)

    class Meta:
        verbose_name = 'Skill'
        verbose_name_plural = 'Skills'

    def __str__(self):
        return self.skill


class Roles(models.Model):
    ROLES = (
        ('Student', 'Student'),
        ('Faculty', 'Faculty'),
        ('Faculty Advisor', 'Faculty Advisor'),
        ('Department Office', 'Department Office'),
        ('Head of Department', 'Head of Department')
    )
    role = models.CharField(max_length=25, choices=ROLES, default='Student')

    class Meta:
        verbose_name = 'Role'
        verbose_name_plural = 'Roles'

    def __str__(self):
        return self.role


class Courses(models.Model):
    course = models.CharField(max_length=100)

    class Meta:
        verbose_name = 'Course'
        verbose_name_plural = 'Courses'

    def __str__(self):
        return self.course


class ProgramAndBranch(models.Model):
    """
    @Roll_number = B19EE024
    => program = CATEGORY
    => name = Electrical Engineering
    => abbreviation = BTech EE
    => getter = B/EE
    """
    CATEGORY = (
        ('BTech', 'BTech'),
    )
    program = models.CharField(max_length=10, choices=CATEGORY, default="BTech")
    name = models.CharField(max_length=60, default="Electrical Engineering")
    abbreviation = models.CharField(max_length=20, blank=True, null=True)
    getter = models.CharField(max_length=10, default="B/EE")

    def __str__(self):
        return self.program + " " + self.name


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    roll_number = models.CharField(max_length=15, blank = True, null = True)
    year = models.SmallIntegerField()
    program_branch = models.ForeignKey(ProgramAndBranch, on_delete=models.SET_NULL, null=True)
    cgpa = models.FloatField()
    registration_timestamp = models.DateTimeField(auto_now_add = True, blank = True, null = True)

    def __str__(self):
        return self.user.get_full_name()