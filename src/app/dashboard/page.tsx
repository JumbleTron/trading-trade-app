import { auth } from "@/auth";
import { getUserStats } from "@/lib/stats-actions";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Trophy, BookOpen, Target, Clock, ArrowRight, ShieldCheck } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const stats = await getUserStats(session.user.id);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight">Cześć, {session.user.name || "Inwestorze"}!</h1>
        <p className="text-secondary">Śledź swój postęp i trenuj czytanie sygnałów rynkowych.</p>
      </div>

      {/* Grid ze statystykami */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="glass-panel p-6 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-[rgba(59,130,246,0.1)] text-primary">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-sm text-secondary block font-medium">Ukończone lekcje</span>
            <span className="text-2xl font-bold">{stats.completedLessons}</span>
          </div>
        </div>

        <div className="glass-panel p-6 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-[rgba(245,158,11,0.1)] text-accent">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <span className="text-sm text-secondary block font-medium">Wykonane próby</span>
            <span className="text-2xl font-bold">{stats.totalAttempts}</span>
          </div>
        </div>

        <div className="glass-panel p-6 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-[rgba(16,185,129,0.1)] text-success">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <span className="text-sm text-secondary block font-medium">Trafność decyzji</span>
            <span className="text-2xl font-bold">{stats.accuracy}%</span>
          </div>
        </div>

        <div className="glass-panel p-6 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-[rgba(139,92,246,0.1)] text-purple-500">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-sm text-secondary block font-medium">Rola konta</span>
            <span className="text-2xl font-bold uppercase text-xs tracking-wider">{session.user.role || "Użytkownik"}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Ostatnia Aktywność */}
        <div className="glass-panel p-6 md:col-span-2 space-y-4">
          <h2 className="text-xl font-bold">Ostatnio ukończone lekcje</h2>
          {stats.recentProgress.length > 0 ? (
            <div className="divide-y divide-[var(--card-border)]">
              {stats.recentProgress.map((item, idx) => (
                <div key={idx} className="py-3 flex justify-between items-center first:pt-0 last:pb-0">
                  <div>
                    <span className="font-semibold text-sm block">{item.lessonTitle}</span>
                    <span className="text-xs text-secondary">
                      Ukończono: {new Date(item.completedAt).toLocaleDateString("pl-PL")}
                    </span>
                  </div>
                  <Link
                    href={`/courses/podstawy-analizy-technicznej/lessons/${item.lessonId}`}
                    className="text-xs font-semibold text-primary flex items-center gap-1 hover:underline"
                  >
                    Przejdź <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-secondary text-sm">Nie ukończyłeś jeszcze żadnej lekcji. Czas zacząć naukę!</p>
          )}
        </div>

        {/* Szybki Skrót / CTA */}
        <div className="glass-panel p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="text-lg font-bold">Zacznij analizować</h3>
            <p className="text-secondary text-sm">
              Wybierz tryb szkoleniowy lub przejdź do biblioteki wykresów aby przetrenować wzorce świecowe na złocie i ropie.
            </p>
          </div>
          <Link href="/courses" className="btn-primary text-center block w-full py-2.5">
            Kontynuuj naukę
          </Link>
        </div>
      </div>
    </div>
  );
}
