from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=100)
    roll_no = models.CharField(max_length=20, unique=True,)
    age = models.IntegerField(default=18)
    email = models.EmailField(unique=True, default='default@example.com')
    course = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name} ({self.roll_no})"

class Attendance(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='attendances')
    date = models.DateField()
    status = models.CharField(max_length=10, choices=[('Present', 'Present'), ('Absent', 'Absent')])

    class Meta:
        unique_together = ('student', 'date')
        ordering = ['-date']

    def __str__(self):
        return f"{self.student.roll_no} - {self.date} - {self.status}"

