"use client";

import React, { useState } from "react";
import CandlestickChart from "./CandlestickChart";
import { CandleData } from "@/lib/types";

interface Props {
  initialCandles: CandleData[];
  correctAction: "BUY" | "SELL" | string;
  explanation?: string | null;
  onSuccess?: () => void;
}

export default function PredictRevealChart({ initialCandles, correctAction, explanation, onSuccess }: Props) {
  // Rozdzielamy dane na widoczne na starcie (np. pierwsze 80%) i te, które "odkryjemy" po decyzji
  const splitIndex = Math.floor(initialCandles.length * 0.75);
  const visibleData = initialCandles.slice(0, splitIndex);
  const hiddenData = initialCandles.slice(splitIndex);

  const [candles, setCandles] = useState<CandleData[]>(visibleData);
  const [userDecision, setUserDecision] = useState<"BUY" | "SELL" | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [markers, setMarkers] = useState<any[]>([]);

  const handleDecision = (decision: "BUY" | "SELL") => {
    setUserDecision(decision);
    setRevealed(true);

    // Odkrywamy resztę świec na wykresie
    setCandles(initialCandles);

    // Wstawiamy marker decyzji użytkownika w punkcie podjęcia decyzji
    const decisionTime = visibleData[visibleData.length - 1].time;
    const isSuccess = decision === correctAction;

    setMarkers([
      {
        time: decisionTime,
        position: decision === "BUY" ? "belowBar" : "aboveBar",
        color: isSuccess ? "#10b981" : "#ef4444",
        shape: decision === "BUY" ? "arrowUp" : "arrowDown",
        text: `${decision} - ${isSuccess ? "Prawidłowo!" : "Błąd"}`,
      },
    ]);

    if (isSuccess && onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="glass-panel p-6 space-y-6">
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-foreground">Co zrobisz w tym punkcie?</h3>
        <p className="text-secondary text-sm">Przeanalizuj dotychczasowy ruch ceny i podejmij decyzję BUY lub SELL.</p>
      </div>

      <CandlestickChart data={candles} markers={markers} />

      {!revealed ? (
        <div className="flex gap-4 justify-center">
          <button onClick={() => handleDecision("BUY")} className="btn-buy flex-1 text-center py-3">
            KUP (BUY)
          </button>
          <button onClick={() => handleDecision("SELL")} className="btn-sell flex-1 text-center py-3">
            SPRZEDAJ (SELL)
          </button>
        </div>
      ) : (
        <div className="p-4 rounded-md bg-[rgba(255,255,255,0.03)] border border-[var(--card-border)] space-y-3">
          <div className="font-bold flex items-center gap-2">
            {userDecision === correctAction ? (
              <span className="text-success text-lg">Brawo! Dobra decyzja rynkowa.</span>
            ) : (
              <span className="text-danger text-lg">Zła decyzja. Przeanalizuj wyjaśnienie poniżej.</span>
            )}
          </div>
          {explanation && <p className="text-secondary text-sm">{explanation}</p>}
        </div>
      )}
    </div>
  );
}
