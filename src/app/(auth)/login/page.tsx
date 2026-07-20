"use client";

import React, { useActionState, startTransition } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");
  
  const [error, setError] = React.useState<string | null>(null);
  const [isPending, setIsPending] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: true,
        redirectTo: "/dashboard",
      });
      if (res?.error) {
        setError("Nieprawidłowy adres email lub hasło.");
      }
    } catch (err) {
      setError("Wystąpił nieoczekiwany błąd logowania.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="glass-panel max-w-md mx-auto p-8 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold">Zaloguj się</h1>
        <p className="text-secondary text-sm">Witaj z powrotem w TradeTraining</p>
      </div>

      {registered && (
        <div className="p-3 bg-success-light border border-success text-success text-sm rounded text-center">
          Konto utworzone pomyślnie! Zaloguj się teraz.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
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

        {error && (
          <p className="text-danger text-sm font-medium">{error}</p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="btn-primary w-full py-3 disabled:opacity-50"
        >
          {isPending ? "Logowanie..." : "Zaloguj się"}
        </button>
      </form>

      <p className="text-center text-sm text-secondary">
        Nie masz konta?{" "}
        <Link href="/register" className="text-primary hover:underline font-medium">
          Zarejestruj się
        </Link>
      </p>
    </div>
  );
}
