from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentViewSet,AttendanceViewSet # Ensure this exists

router = DefaultRouter()
router.register(r'students', StudentViewSet)
router.register(r'attendance', AttendanceViewSet)

urlpatterns = router.urls
