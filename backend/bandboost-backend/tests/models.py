from django.conf import settings
from django.db import models


class Test(models.Model):
    SKILL_CHOICES = [
        ("reading", "Reading"),
        ("listening", "Listening"),
        ("writing", "Writing"),
        ("speaking", "Speaking"),
    ]

    title = models.CharField(max_length=255)
    skill = models.CharField(max_length=20, choices=SKILL_CHOICES)
    duration_minutes = models.PositiveIntegerField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Question(models.Model):
    test = models.ForeignKey(Test, related_name="questions", on_delete=models.CASCADE)
    text = models.TextField()

    def __str__(self):
        return f"{self.test.title} - question"


class Choice(models.Model):
    question = models.ForeignKey(
        Question, related_name="choices", on_delete=models.CASCADE
    )
    text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)


class Attempt(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="attempts",
        on_delete=models.CASCADE,
    )
    test = models.ForeignKey(Test, on_delete=models.CASCADE)

    raw_score = models.PositiveIntegerField(default=0)
    band = models.FloatField(null=True, blank=True)

    started_at = models.DateTimeField(auto_now_add=True)
    finished_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.user} - {self.test}"
