"use client";

import React, { useActionState, startTransition } from "react";
import { registerUser } from "@/lib/auth-actions";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(registerUser, null);

  React.useEffect(() => {
    if (state?.success) {
      router.push("/login?registered=true");
    }
  }, [state, router]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <div className="glass-panel max-w-md mx-auto p-8 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold">Załóż konto</h1>
        <p className="text-secondary text-sm">Dołącz do TradeTraining i zacznij naukę</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Imię i nazwisko</label>
          <input
            name="name"
            type="text"
            required
            className="w-full px-4 py-2.5 rounded-md border border-[var(--card-border)] bg-[var(--background)] text-foreground focus:border-primary focus:outline-none"
            placeholder="Jan Kowalski"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Adres Email</label>
          <input
            name="email"
            type="email"
            required
            className="w-full px-4 py-2.5 rounded-md border border-[var(--card-border)] bg-[var(--background)] text-foreground focus:border-primary focus:outline-none"
            placeholder="email@example.com"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Hasło</label>
          <input
            name="password"
            type="password"
            required
            className="w-full px-4 py-2.5 rounded-md border border-[var(--card-border)] bg-[var(--background)] text-foreground focus:border-primary focus:outline-none"
            placeholder="••••••••"
          />
        </div>

        {state?.error && (
          <p className="text-danger text-sm font-medium">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="btn-primary w-full py-3 disabled:opacity-50"
        >
          {isPending ? "Rejestracja..." : "Utwórz konto"}
        </button>
      </form>

      <p className="text-center text-sm text-secondary">
        Masz już konto?{" "}
        <Link href="/login" className="text-primary hover:underline font-medium">
          Zaloguj się
        </Link>
      </p>
    </div>
  );
}
