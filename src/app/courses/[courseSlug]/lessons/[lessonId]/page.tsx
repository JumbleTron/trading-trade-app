import { getLessonWithDetails } from "@/lib/actions";
import LessonContentWidget from "@/components/lesson/LessonContent";
import QuizWidget from "@/components/lesson/QuizWidget";
import PredictRevealChart from "@/components/charts/PredictRevealChart";
import Link from "next/link";
import { ArrowLeft, BookOpen, GraduationCap } from "lucide-react";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    courseSlug: string;
    lessonId: string;
  }>;
}

export default async function LessonPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lesson = await getLessonWithDetails(resolvedParams.lessonId);

  if (!lesson) {
    return notFound();
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <Link href="/courses" className="flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Powrót do kursów
      </Link>

      <div className="glass-panel p-6 space-y-4">
        <div>
          <span className="text-xs text-primary font-semibold uppercase tracking-wider">
            {lesson.chapter?.title}
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight mt-1">{lesson.title}</h1>
        </div>

        <div className="border-t border-[var(--card-border)] pt-6">
          <LessonContentWidget contentJson={lesson.contentJson} />
        </div>
      </div>

      {lesson.exercises.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-primary" />
            Ćwiczenie Praktyczne
          </h2>

          {lesson.exercises.map((exercise) => {
            if (exercise.type === "quiz") {
              return (
                <QuizWidget
                  key={exercise.id}
                  exerciseId={exercise.id}
                  question={exercise.question}
                  options={exercise.options}
                  explanation={exercise.explanation}
                />
              );
            }
            if (exercise.type === "predict_reveal" && exercise.chartDataJson) {
              try {
                const chartData = JSON.parse(exercise.chartDataJson);
                return (
                  <PredictRevealChart
                    key={exercise.id}
                    initialCandles={chartData}
                    correctAction={exercise.correctAnswer}
                    explanation={exercise.explanation}
                  />
                );
              } catch (e) {
                return (
                  <div key={exercise.id} className="text-danger">
                    Błąd ładowania danych wykresu do ćwiczenia.
                  </div>
                );
              }
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
}
