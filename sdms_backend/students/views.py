from rest_framework import viewsets, filters
from .models import Student, Attendance
from .serializers import StudentSerializer, AttendanceSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'roll_no', 'course']


class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['student__name', 'student__roll_no', 'student__course', 'date', 'status']


