"use client";

import React, { useState } from "react";

interface Option {
  id: string;
  optionText: string;
  isCorrect: boolean;
}

interface Props {
  exerciseId: string;
  question: string;
  options: Option[];
  explanation?: string | null;
  onSuccess?: () => void;
}

export default function QuizWidget({ exerciseId, question, options, explanation, onSuccess }: Props) {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    if (!selectedOptionId) return;

    const selected = options.find((opt) => opt.id === selectedOptionId);
    const correct = !!selected?.isCorrect;

    setIsCorrect(correct);
    setSubmitted(true);

    if (correct && onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="glass-panel p-6 space-y-4">
      <h3 className="text-lg font-bold text-foreground">{question}</h3>

      <div className="grid gap-3">
        {options.map((option) => (
          <button
            key={option.id}
            disabled={submitted}
            onClick={() => setSelectedOptionId(option.id)}
            className={`w-full text-left p-4 rounded-md border transition-all ${
              submitted
                ? option.isCorrect
                  ? "bg-success-light border-success text-success"
                  : selectedOptionId === option.id
                  ? "bg-danger-light border-danger text-danger"
                  : "bg-[var(--background)] border-[var(--card-border)]"
                : selectedOptionId === option.id
                ? "border-primary bg-primary-light"
                : "border-[var(--card-border)] bg-[var(--background)] hover:border-primary"
            }`}
          >
            {option.optionText}
          </button>
        ))}
      </div>

      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={!selectedOptionId}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sprawdź odpowiedź
        </button>
      ) : (
        <div className="p-4 rounded-md bg-[rgba(255,255,255,0.03)] border border-[var(--card-border)] space-y-2">
          <div className="font-bold flex items-center gap-2">
            {isCorrect ? (
              <span className="text-success">Doskonale! Dobra odpowiedź.</span>
            ) : (
              <span className="text-danger">Niestety, spróbuj jeszcze raz.</span>
            )}
          </div>
          {explanation && (
            <p className="text-secondary text-sm">{explanation}</p>
          )}
        </div>
      )}
    </div>
  );
}
