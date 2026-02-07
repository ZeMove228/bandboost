from django.urls import path
from .views import health, DashboardView, LeaderboardView

urlpatterns = [
    path("health/", health),
    path("dashboard/", DashboardView.as_view()),
    path("leaderboard/", LeaderboardView.as_view()),
]
