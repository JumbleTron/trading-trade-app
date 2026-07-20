"use client";

import React, { useEffect, useRef, useState } from "react";
import { createChart, IChartApi, ISeriesApi } from "lightweight-charts";
import { CandleData } from "@/lib/types";

interface Props {
  data: CandleData[];
  markers?: { time: string; position: "aboveBar" | "belowBar"; color: string; shape: "arrowUp" | "arrowDown"; text: string }[];
}

export default function CandlestickChart({ data, markers = [] }: Props) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Inicjalizacja wykresu z ciemnym/premium motywem
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: "#090d16" },
        textColor: "#94a3b8",
      },
      grid: {
        vertLines: { color: "#1e293b" },
        horzLines: { color: "#1e293b" },
      },
      timeScale: {
        borderColor: "#334155",
      },
      width: chartContainerRef.current.clientWidth,
      height: 350,
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#10b981",
      downColor: "#ef4444",
      borderUpColor: "#10b981",
      borderDownColor: "#ef4444",
      wickUpColor: "#10b981",
      wickDownColor: "#ef4444",
    });

    candlestickSeries.setData(data);
    seriesRef.current = candlestickSeries;
    chartRef.current = chart;

    // Obsługa zmiany szerokości okna
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [data]);

  // Efekt do obsługi markerów BUY/SELL
  useEffect(() => {
    if (seriesRef.current && markers.length > 0) {
      seriesRef.current.setMarkers(markers);
    }
  }, [markers]);

  return <div ref={chartContainerRef} className="w-full rounded-lg overflow-hidden border border-[#334155]" />;
}
