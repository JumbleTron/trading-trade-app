import Link from "next/link";
import { TrendingUp, BookOpen, GraduationCap, Trophy } from "lucide-react";
import { auth } from "@/auth";

export default async function Navigation() {
  const session = await auth();

  return (
    <header className="glass-panel sticky top-0 z-50 flex items-center justify-between px-6 py-4 mx-4 my-2">
      <Link href="/" className="flex items-center gap-2 font-bold text-xl text-foreground">
        <TrendingUp className="text-primary w-6 h-6" />
        <span>Trade<span className="text-primary">Training</span></span>
      </Link>

      <nav className="flex items-center gap-6">
        <Link href="/courses" className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
          <BookOpen className="w-4 h-4" />
          <span>Kursy</span>
        </Link>
        <Link href="/practice" className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
          <GraduationCap className="w-4 h-4" />
          <span>Trening</span>
        </Link>
        <Link href="/dashboard" className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
          <Trophy className="w-4 h-4" />
          <span>Dashboard</span>
        </Link>
      </nav>

      <div className="flex items-center gap-4">
        {session?.user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-secondary hidden sm:inline">
              Zalogowany: <strong>{session.user.name || session.user.email}</strong>
            </span>
            <Link href="/api/auth/signout" className="text-sm font-medium text-danger hover:underline">
              Wyloguj
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
              Zaloguj
            </Link>
            <Link href="/register" className="btn-primary text-sm">
              Zarejestruj
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
