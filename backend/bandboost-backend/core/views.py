from django.http import JsonResponse
from django.db import models
from django.contrib.auth import get_user_model

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from tests.models import Attempt

User = get_user_model()


def health(request):
    return JsonResponse({"status": "ok", "project": "bandboost"})


class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        qs = Attempt.objects.filter(user=request.user)
        total_attempts = qs.count()
        avg_band = qs.exclude(band=None).aggregate(avg=models.Avg("band"))["avg"]
        last_attempt = qs.order_by("-id").values("id", "raw_score", "band", "started_at").first()

        return Response(
            {
                "total_attempts": total_attempts,
                "average_band": avg_band,
                "last_attempt": last_attempt,
            }
        )


class LeaderboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        users = (
            User.objects.annotate(
                avg_band=models.Avg("attempts__band"),
                attempts=models.Count("attempts"),
            )
            .filter(attempts__gt=0)
            .order_by("-avg_band")[:20]
        )

        return Response(
            [
                {
                    "id": u.id,
                    "username": u.username,
                    "avg_band": u.avg_band,
                    "attempts": u.attempts,
                }
                for u in users
            ]
        )
