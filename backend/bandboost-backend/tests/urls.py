from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import TestViewSet, AttemptViewSet

router = DefaultRouter()
router.register(r"tests", TestViewSet, basename="tests")
router.register(r"attempts", AttemptViewSet, basename="attempts")

urlpatterns = [
    path("", include(router.urls)),
]
