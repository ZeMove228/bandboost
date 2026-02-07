from rest_framework import serializers
from .models import Test, Passage, QuestionGroup, Question, Attempt, AttemptAnswer


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ["id", "number", "prompt", "meta"]


class QuestionGroupSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = QuestionGroup
        fields = [
            "id",
            "order",
            "instructions",
            "question_type",
            "number_from",
            "number_to",
            "word_limit",
            "data",
            "questions",
        ]


class PassageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Passage
        fields = ["id", "order", "title", "text"]


class TestListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = ["id", "code", "title", "skill", "version", "duration_minutes", "level", "is_published"]


class TestDetailSerializer(serializers.ModelSerializer):
    passages = PassageSerializer(many=True, read_only=True)
    groups = QuestionGroupSerializer(many=True, read_only=True)

    class Meta:
        model = Test
        fields = [
            "id",
            "code",
            "title",
            "skill",
            "version",
            "duration_minutes",
            "level",
            "is_published",
            "passages",
            "groups",
        ]


class AttemptSerializer(serializers.ModelSerializer):
    test_code = serializers.CharField(source="test.code", read_only=True)

    class Meta:
        model = Attempt
        fields = ["id", "test", "test_code", "started_at", "finished_at", "raw_score", "band"]
        read_only_fields = ["started_at", "finished_at", "raw_score", "band"]


class AttemptAnswerSerializer(serializers.ModelSerializer):
    question_number = serializers.IntegerField(source="question.number", read_only=True)

    class Meta:
        model = AttemptAnswer
        fields = ["id", "question", "question_number", "answer", "is_correct"]
        read_only_fields = ["is_correct"]
