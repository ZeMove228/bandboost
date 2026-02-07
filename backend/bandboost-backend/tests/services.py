from __future__ import annotations
from typing import Optional
from django.utils import timezone
from .models import Attempt, AttemptAnswer, Question


def _normalize(s: str) -> str:
    return (s or "").strip().lower()


def is_answer_correct(question: Question, answer: str) -> bool:
    ans = _normalize(answer)
    accepted = [_normalize(x) for x in (question.accepted_answers or []) if str(x).strip()]
    if accepted:
        return ans in accepted

    return ans == _normalize(question.correct_answer)


def grade_attempt(attempt: Attempt) -> Attempt:
    answers = AttemptAnswer.objects.select_related("question").filter(attempt=attempt)

    score = 0
    for a in answers:
        correct = is_answer_correct(a.question, a.answer)
        a.is_correct = correct
        a.save(update_fields=["is_correct"])
        if correct:
            score += 1

    attempt.raw_score = score
    attempt.band = None
    attempt.finished_at = timezone.now()
    attempt.save(update_fields=["raw_score", "band", "finished_at"])
    return attempt
