import Link from "next/link";
import { getCoursesWithChapters } from "@/lib/actions";
import { BookOpen, CheckCircle, Lock } from "lucide-react";
import { auth } from "@/auth";

export default async function CoursesPage() {
  const session = await auth();
  const allCourses = await getCoursesWithChapters();

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-3 py-6">
        <h1 className="text-4xl font-extrabold tracking-tight">Akademia Wykresów</h1>
        <p className="text-secondary text-lg">
          Wybierz kurs i przejdź przez rozdziały z ćwiczeniami praktycznymi BUY/SELL.
        </p>
      </div>

      <div className="space-y-6">
        {allCourses.map((course) => (
          <div key={course.id} className="glass-panel p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary px-2.5 py-0.5 rounded-full bg-[rgba(59,130,246,0.1)]">
                  Poziom: {course.level === "beginner" ? "Początkujący" : "Średniozaawansowany"}
                </span>
                <h2 className="text-2xl font-bold mt-2">{course.title}</h2>
                <p className="text-secondary text-sm mt-1">{course.description}</p>
              </div>
            </div>

            <div className="border-t border-[var(--card-border)] pt-4 space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Spis Rozdziałów
              </h3>

              <div className="grid gap-4">
                {course.chapters.map((chapter) => (
                  <div key={chapter.id} className="p-4 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)]">
                    <h4 className="font-bold text-foreground mb-2">{chapter.title}</h4>
                    <p className="text-secondary text-xs mb-3">{chapter.description}</p>

                    <div className="grid gap-2 sm:grid-cols-2">
                      {chapter.lessons.map((lesson) => (
                        <Link
                          key={lesson.id}
                          href={`/courses/${course.slug}/lessons/${lesson.id}`}
                          className="flex items-center justify-between p-3 rounded bg-[var(--background)] border border-[var(--card-border)] hover:border-primary transition-all group"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-secondary group-hover:text-primary transition-colors">
                              Lekcja {lesson.orderIndex}
                            </span>
                            <span className="text-sm font-medium">{lesson.title.split(" ").slice(1).join(" ")}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-secondary">{lesson.durationMin} min</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
