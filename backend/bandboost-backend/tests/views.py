from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Test, Attempt, AttemptAnswer, Question
from .serializers import (
    TestListSerializer,
    TestDetailSerializer,
    AttemptSerializer,
)
from .services import grade_attempt


class TestViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Test.objects.all().order_by("-id")

    def get_queryset(self):
        qs = super().get_queryset()

        # По умолчанию фронту лучше показывать только опубликованные
        published = self.request.query_params.get("published", "1")
        if published in ("1", "true", "yes"):
            qs = qs.filter(is_published=True)

        skill = self.request.query_params.get("skill")
        if skill:
            qs = qs.filter(skill=skill)

        return qs

    def get_serializer_class(self):
        if self.action == "retrieve":
            return TestDetailSerializer
        return TestListSerializer


class AttemptViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = AttemptSerializer

    def get_queryset(self):
        return Attempt.objects.filter(user=self.request.user).order_by("-id")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=["post"])
    def submit(self, request, pk=None):
        """
        Body:
        {
          "answers": [
            {"question": 123, "answer": "B"},
            {"question": 124, "answer": "TRUE"}
          ]
        }
        """
        attempt = self.get_object()
        answers = request.data.get("answers", [])
        if not isinstance(answers, list):
            return Response({"detail": "answers must be a list"}, status=status.HTTP_400_BAD_REQUEST)

        # создаём/обновляем ответы
        for item in answers:
            qid = item.get("question")
            ans = item.get("answer", "")
            if not qid:
                continue
            try:
                q = Question.objects.get(id=qid)
            except Question.DoesNotExist:
                continue

            AttemptAnswer.objects.update_or_create(
                attempt=attempt,
                question=q,
                defaults={"answer": str(ans)},
            )

        grade_attempt(attempt)
        data = AttemptSerializer(attempt).data
        return Response(data, status=status.HTTP_200_OK)

    @action(detail=True, methods=["get"])
    def result(self, request, pk=None):
        attempt = self.get_object()

        # краткий результат + ответы (для разборов позже расширим)
        answers = AttemptAnswer.objects.select_related("question").filter(attempt=attempt).order_by("question__number")
        return Response(
            {
                "attempt": AttemptSerializer(attempt).data,
                "answers": [
                    {
                        "question": a.question_id,
                        "number": a.question.number,
                        "answer": a.answer,
                        "is_correct": a.is_correct,
                        "correct_answer": a.question.correct_answer,
                        "accepted_answers": a.question.accepted_answers,
                    }
                    for a in answers
                ],
            }
        )
