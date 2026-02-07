from django.utils import timezone
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Test, Attempt, Question, Choice
from .serializers import TestListSerializer, TestDetailSerializer, AttemptSerializer


class TestViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Test.objects.all().order_by("-id")

    def get_queryset(self):
        qs = super().get_queryset()
        skill = self.request.query_params.get("skill")
        if skill:
            qs = qs.filter(skill=skill)
        return qs

    def get_serializer_class(self):
        return TestDetailSerializer if self.action == "retrieve" else TestListSerializer


class AttemptViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = AttemptSerializer

    def get_queryset(self):
        return Attempt.objects.filter(user=self.request.user).order_by("-id")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=["get"])
    def my(self, request):
        qs = self.get_queryset()
        return Response(self.get_serializer(qs, many=True).data)

    @action(detail=True, methods=["post"])
    def submit(self, request, pk=None):
        """
        body:
        {
          "answers": [
            {"question": 1, "choice": 10},
            {"question": 2, "text": "my answer"}  # на будущее
          ]
        }
        """
        attempt = self.get_object()
        answers = request.data.get("answers", [])
        if not isinstance(answers, list):
            return Response({"detail": "answers must be a list"}, status=status.HTTP_400_BAD_REQUEST)

        score = 0

        # простой подсчёт только MCQ через Choice.is_correct
        for item in answers:
            qid = item.get("question")
            cid = item.get("choice")
            if not (qid and cid):
                continue
            try:
                choice = Choice.objects.select_related("question").get(id=cid, question_id=qid)
            except Choice.DoesNotExist:
                continue
            if choice.is_correct:
                score += 1

        attempt.raw_score = score
        attempt.finished_at = timezone.now()
        attempt.save(update_fields=["raw_score", "finished_at"])

        return Response(AttemptSerializer(attempt).data)

    @action(detail=True, methods=["get"])
    def result(self, request, pk=None):
        attempt = self.get_object()
        return Response(
            {
                "attempt": AttemptSerializer(attempt).data,
            }
        )