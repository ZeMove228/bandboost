from rest_framework import serializers
from .models import Test, Question, Choice, Attempt


class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ["id", "text"]  # is_correct не отдаём фронту


class QuestionSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ["id", "text", "choices"]


class TestListSerializer(serializers.ModelSerializer):
    questions_count = serializers.IntegerField(source="questions.count", read_only=True)

    class Meta:
        model = Test
        fields = ["id", "title", "skill", "duration_minutes", "questions_count"]


class TestDetailSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Test
        fields = ["id", "title", "skill", "duration_minutes", "questions"]


class AttemptSerializer(serializers.ModelSerializer):
    test_title = serializers.CharField(source="test.title", read_only=True)

    class Meta:
        model = Attempt
        fields = ["id", "test", "test_title", "raw_score", "band", "started_at", "finished_at"]
        read_only_fields = ["raw_score", "band", "started_at", "finished_at"]
