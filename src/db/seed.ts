import { db } from "@/db";
import { courses, chapters, lessons, exercises, exerciseOptions } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function seedInitialCourseData() {
  // Sprawdzamy czy kurs już istnieje
  const existingCourses = await db.select().from(courses).limit(1);
  if (existingCourses.length > 0) {
    console.log("Kursy już istnieją w bazie danych. Pomijam seedowanie.");
    return;
  }

  console.log("Rozpoczynam seedowanie danych kursu...");

  const mainCourseId = "course-ta-foundations";
  
  // 1. Dodawanie głównego kursu
  await db.insert(courses).values({
    id: mainCourseId,
    title: "Podstawy Analizy Technicznej i Czytania Wykresów",
    description: "Kompleksowy kurs od zera uczący jak interpretować ruchy cen, formacje świecowe i wskaźniki na rynkach złota, ropy, forex oraz indeksach giełdowych.",
    slug: "podstawy-analizy-technicznej",
    level: "beginner",
    marketType: "all",
    orderIndex: 1,
  });

  // 2. Rozdziały
  const chap1Id = "chap-1-intro";
  const chap2Id = "chap-2-trends";
  const chap3Id = "chap-3-candles";

  await db.insert(chapters).values([
    {
      id: chap1Id,
      courseId: mainCourseId,
      title: "Rozdział 1: Podstawy czytania wykresów",
      description: "Poznaj fundamenty: rodzaje wykresów, anatomię świecy japońskiej oraz timeframes.",
      orderIndex: 1,
    },
    {
      id: chap2Id,
      courseId: mainCourseId,
      title: "Rozdział 2: Trend, Wsparcie i Opór",
      description: "Zrozum strukturę rynku i naucz się wyznaczać kluczowe poziomy decyzyjne.",
      orderIndex: 2,
    },
    {
      id: chap3Id,
      courseId: mainCourseId,
      title: "Rozdział 3: Formacje świecowe i sygnały BUY/SELL",
      description: "Naucz się rozpoznawać formacje świecowe zwiastujące odwrócenie lub kontynuację trendu.",
      orderIndex: 3,
    }
  ]);

  // 3. Lekcje dla Rozdziału 1
  const les1_1Id = "les-1-1-chart-types";
  const les1_2Id = "les-1-2-candle-anatomy";

  await db.insert(lessons).values([
    {
      id: les1_1Id,
      chapterId: chap1Id,
      title: "1.1 Rodzaje wykresów: liniowy, słupkowy, świecowy",
      contentJson: JSON.stringify({
        blocks: [
          { type: "paragraph", text: "Wykresy finansowe obrazują zachowanie ceny w czasie. Istnieją trzy główne typy wykresów stosowane przez inwestorów:" },
          { type: "list", items: [
            "**Wykres liniowy**: Łączy tylko ceny zamknięcia. Najbardziej uproszczony, eliminuje szum rynkowy.",
            "**Wykres słupkowy (OHLC)**: Pokazuje cenę otwarcia (Open), maksymalną (High), minimalną (Low) i zamknięcia (Close) jako pionowy słupek.",
            "**Wykres świecowy**: Najpopularniejszy. Wizualizuje te same dane co słupkowy, ale posiada kolorowy 'korpus' ułatwiający szybką interpretację."
          ]}
        ]
      }),
      lessonType: "theory",
      durationMin: 5,
      orderIndex: 1,
    },
    {
      id: les1_2Id,
      chapterId: chap1Id,
      title: "1.2 Anatomia świecy japońskiej: Open, High, Low, Close",
      contentJson: JSON.stringify({
        blocks: [
          { type: "paragraph", text: "Każda świeca na wykresie reprezentuje wybrany okres czasu (np. 1 dzień, 1 godzinę). Świeca składa się z:" },
          { type: "list", items: [
            "**Korpusu (Body)**: Obszar między ceną otwarcia a zamknięcia. Jeśli zamknięcie jest wyżej niż otwarcie - świeca jest zielona (bycza). W przeciwnym razie jest czerwona (niedźwiedzia).",
            "**Cieni (Wicks/Shadows)**: Linie wystające ponad i poniżej korpusu, reprezentujące maksymalne (High) i minimalne (Low) ceny osiągnięte w danym okresie."
          ]}
        ]
      }),
      lessonType: "practice",
      durationMin: 7,
      orderIndex: 2,
    }
  ]);

  // 4. Ćwiczenie do Lekcji 1.2 (Predict & Reveal / Quiz)
  const ex1Id = "ex-1-2-candle-quiz";
  await db.insert(exercises).values({
    id: ex1Id,
    lessonId: les1_2Id,
    type: "quiz",
    chartDataJson: JSON.stringify([
      { time: "2026-07-01", open: 100, high: 150, low: 90, close: 140 },
    ]),
    question: "Jeżeli świeca otworzyła się na poziomie 100, osiągnęła maksimum na 150, minimum na 90 i zamknęła się na poziomie 140, to jaki ma kolor i jak długa jest górny cień (wick)?",
    correctAnswer: "Zielona, górny cień wynosi 10",
    explanation: "Cena zamknięcia (140) jest wyższa niż otwarcia (100), więc świeca jest zielona. Górny cień to odległość od High (150) do Close (140), czyli 10 punktów.",
    market: "XAUUSD",
    timeframe: "D1",
    difficulty: "easy"
  });

  await db.insert(exerciseOptions).values([
    { id: "opt-1", exerciseId: ex1Id, optionText: "Zielona, górny cień wynosi 10", isCorrect: true },
    { id: "opt-2", exerciseId: ex1Id, optionText: "Czerwona, górny cień wynosi 10", isCorrect: false },
    { id: "opt-3", exerciseId: ex1Id, optionText: "Zielona, górny cień wynosi 50", isCorrect: false },
    { id: "opt-4", exerciseId: ex1Id, optionText: "Czerwona, górny cień wynosi 50", isCorrect: false },
  ]);

  console.log("Seedowanie ukończone pomyślnie.");
}
