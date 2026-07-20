import Link from "next/link";
import { TrendingUp, Award, Play, ChevronRight, BarChart3, Activity } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-3xl mx-auto py-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)] text-primary text-xs font-semibold uppercase tracking-wider">
          <Activity className="w-3.5 h-3.5 animate-pulse" /> Platforma Edukacyjna Nowej Generacji
        </div>
        <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-none">
          Opanuj Czytanie Wykresów z <span className="text-primary">TradeTraining</span>
        </h1>
        <p className="text-lg text-secondary leading-relaxed">
          Ucz się analizy technicznej na żywych i historycznych rynkach złota, ropy, USD/EUR, PLN/EUR oraz US500. Rozwiązuj interaktywne symulacje i podejmuj realne decyzje BUY/SELL.
        </p>
        <div className="flex flex-wrap gap-4 justify-center pt-4">
          <Link href="/courses" className="btn-primary text-base px-8 py-3 flex items-center gap-2">
            Rozpocznij Naukę <Play className="w-4 h-4" />
          </Link>
          <Link href="/practice" className="glass-panel text-base px-8 py-3 font-medium hover:border-primary transition-all">
            Tryb Treningowy
          </Link>
        </div>
      </section>

      {/* Rynki i Aktywa */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Obsługiwane rynki i klasy aktywów</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { name: "Złoto (XAU/USD)", desc: "Bezpieczna przystań", color: "from-amber-500/20 to-transparent" },
            { name: "Ropa Naftowa WTI", desc: "Zmienność energetyczna", color: "from-blue-500/20 to-transparent" },
            { name: "Para USD/EUR", desc: "Największy rynek Forex", color: "from-indigo-500/20 to-transparent" },
            { name: "Para PLN/EUR", desc: "Emerging Markets", color: "from-purple-500/20 to-transparent" },
            { name: "Indeks US500", desc: "Kondycja rynków akcji", color: "from-emerald-500/20 to-transparent" },
          ].map((market, idx) => (
            <div key={idx} className={`glass-panel p-6 bg-gradient-to-br ${market.color} border border-[var(--card-border)]`}>
              <h3 className="font-bold text-base">{market.name}</h3>
              <p className="text-secondary text-xs mt-1">{market.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cechy / Zalety */}
      <section className="grid gap-8 md:grid-cols-3">
        <div className="glass-panel p-6 space-y-3">
          <div className="p-3 rounded-lg bg-[rgba(59,130,246,0.1)] w-fit text-primary">
            <BarChart3 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">Wizualne wykresy</h3>
          <p className="text-secondary text-sm">
            Pracuj na profesjonalnych wykresach świecowych za pomocą biblioteki Lightweight Charts od TradingView.
          </p>
        </div>

        <div className="glass-panel p-6 space-y-3">
          <div className="p-3 rounded-lg bg-[rgba(16,185,129,0.1)] w-fit text-success">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">Predict & Reveal</h3>
          <p className="text-secondary text-sm">
            Przewiduj kolejne świece na rzeczywistych danych historycznych i natychmiast odkrywaj wyniki swoich decyzji rynkowych.
          </p>
        </div>

        <div className="glass-panel p-6 space-y-3">
          <div className="p-3 rounded-lg bg-[rgba(245,158,11,0.1)] w-fit text-accent">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">Nauka z książek i praktyki</h3>
          <p className="text-secondary text-sm">
            Program ułożony na podstawie klasyków literatury tradingu, takich jak John Murphy czy Steve Nison.
          </p>
        </div>
      </section>
    </div>
  );
}
