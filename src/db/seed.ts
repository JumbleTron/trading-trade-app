import { db } from "@/db";
import { courses, chapters, lessons, exercises, exerciseOptions } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function seedInitialCourseData() {
  const existingCourses = await db.select().from(courses).limit(1);
  if (existingCourses.length > 0) {
    console.log("Kursy już istnieją w bazie danych. Pomijam seedowanie.");
    return;
  }

  console.log("Rozpoczynam seedowanie danych kursu...");

  const mainCourseId = "course-ta-foundations";
  
  await db.insert(courses).values({
    id: mainCourseId,
    title: "Podstawy Analizy Technicznej i Czytania Wykresów",
    description: "Kompleksowy kurs od zera uczący jak interpretować ruchy cen, formacje świecowe i wskaźniki na rynkach złota, ropy, forex oraz indeksach giełdowych.",
    slug: "podstawy-analizy-technicznej",
    level: "beginner",
    marketType: "all",
    orderIndex: 1,
  });

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

  // LEKCJE ROZDZIAŁ 1
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

  // LEKCJE ROZDZIAŁ 2 (Trend)
  const les2_1Id = "les-2-1-trends-intro";
  await db.insert(lessons).values([
    {
      id: les2_1Id,
      chapterId: chap2Id,
      title: "2.1 Linie Trendu i Identyfikacja Kierunku Rynku",
      contentJson: JSON.stringify({
        blocks: [
          { type: "paragraph", text: "Trend to ogólny kierunek, w którym podąża cena na wykresie. Wyróżniamy trzy główne typy trendów:" },
          { type: "list", items: [
            "**Trend wzrostowy (Uptrend)**: Charakteryzuje się coraz wyższymi szczytami (Higher Highs) i coraz wyższymi dołkami (Higher Lows).",
            "**Trend spadkowy (Downtrend)**: Charakteryzuje się coraz niższymi szczytami (Lower Highs) i coraz niższymi dołkami (Lower Lows).",
            "**Trend boczny (Consolidation)**: Ruch ceny w określonym przedziale bez wyraźnego kierunku."
          ]}
        ]
      }),
      lessonType: "practice",
      durationMin: 8,
      orderIndex: 1,
    }
  ]);

  // LEKCJE ROZDZIAŁ 3 (Świece - Złoto, Ropa, US500)
  const les3_1Id = "les-3-1-reversals";
  await db.insert(lessons).values([
    {
      id: les3_1Id,
      chapterId: chap3Id,
      title: "3.1 Formacje Odwrócenia Trendu: Młot (Hammer) i Spadająca Gwiazda (Shooting Star)",
      contentJson: JSON.stringify({
        blocks: [
          { type: "paragraph", text: "Formacje świecowe to najszybsze sygnały potencjalnego odwrócenia kierunku ceny na rynku. Dwa kluczowe wzorce to:" },
          { type: "list", items: [
            "**Młot (Hammer)**: Świeca z małym korpusem u góry i długim dolnym cieniem. Sygnalizuje odrzucenie niższych cen przez kupujących (byczy sygnał BUY).",
            "**Spadająca Gwiazda (Shooting Star)**: Świeca z małym korpusem na dole i długim górnym cieniem. Sygnalizuje odrzucenie wyższych cen (niedźwiedzi sygnał SELL)."
          ]}
        ]
      }),
      lessonType: "practice",
      durationMin: 10,
      orderIndex: 1,
    }
  ]);

  // --- ĆWICZENIA ---

  // Ćwiczenie Rozdział 1 (Quiz)
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

  // Ćwiczenie Rozdział 2 (Wsparcie / Opór / Trend - PLN/EUR)
  const ex2Id = "ex-2-1-trend-reveal";
  const plnEurData = [
    { time: "2026-07-01", open: 4.25, high: 4.28, low: 4.24, close: 4.27 },
    { time: "2026-07-02", open: 4.27, high: 4.29, low: 4.26, close: 4.28 },
    { time: "2026-07-03", open: 4.28, high: 4.31, low: 4.27, close: 4.30 },
    { time: "2026-07-04", open: 4.30, high: 4.33, low: 4.29, close: 4.32 },
    { time: "2026-07-05", open: 4.32, high: 4.34, low: 4.30, close: 4.33 },
    // Punkt podjęcia decyzji (koniec 75%)
    { time: "2026-07-06", open: 4.33, high: 4.35, low: 4.31, close: 4.34 },
    // Ukryte świece, które zostaną odkryte po decyzji (rebound z oporu / spadek)
    { time: "2026-07-07", open: 4.34, high: 4.35, low: 4.28, close: 4.29 },
    { time: "2026-07-08", open: 4.29, high: 4.30, low: 4.22, close: 4.23 },
  ];

  await db.insert(exercises).values({
    id: ex2Id,
    lessonId: les2_1Id,
    type: "predict_reveal",
    chartDataJson: JSON.stringify(plnEurData),
    question: "Wykres EUR/PLN dotarł do silnego, historycznego poziomu oporu na 4.35. Świece zaczynają tracić dynamikę. Jaka decyzja jest prawidłowa?",
    correctAnswer: "SELL",
    explanation: "Cena dotarła do silnego oporu na poziomie 4.35 zł za euro i nastąpiło odrzucenie tego poziomu (spadek do 4.23). Otwieranie pozycji krótkiej (SELL) było prawidłową decyzją.",
    market: "EURPLN",
    timeframe: "D1",
    difficulty: "medium"
  });

  // Ćwiczenie Rozdział 3 (Formacja Świecowa - Złoto XAU/USD)
  const goldData = [
    { time: "2026-07-10", open: 1950, high: 1965, low: 1945, close: 1960 },
    { time: "2026-07-11", open: 1960, high: 1970, low: 1955, close: 1968 },
    { time: "2026-07-12", open: 1968, high: 1980, low: 1960, close: 1975 },
    { time: "2026-07-13", open: 1975, high: 1995, low: 1970, close: 1990 },
    // Spadająca gwiazda (odrzucenie poziomu 2000 USD)
    { time: "2026-07-14", open: 1990, high: 2010, low: 1980, close: 1982 },
    // Ukryte świece (drastyczne spadki po odwróceniu)
    { time: "2026-07-15", open: 1982, high: 1985, low: 1940, close: 1945 },
    { time: "2026-07-16", open: 1945, high: 1950, low: 1910, close: 1915 },
  ];

  await db.insert(exercises).values({
    id: ex3Id,
    lessonId: les3_1Id,
    type: "predict_reveal",
    chartDataJson: JSON.stringify(goldData),
    question: "Na wykresie Złota (XAU/USD) utworzyła się świeca z bardzo długim górnym cieniem (odrzucenie bariery 2000 USD) i małym korpusem u dołu (Spadająca Gwiazda / Shooting Star). Jaki sygnał generuje ten układ?",
    correctAnswer: "SELL",
    explanation: "Długi górny cień świecy z 14 lipca oznacza, że kupujący próbowali wypchnąć cenę powyżej 2000 USD, ale podaż silnie zepchnęła ją z powrotem na dół. Powstała Spadająca Gwiazda zapowiadająca spadki (SELL).",
    market: "XAUUSD",
    timeframe: "H4",
    difficulty: "hard"
  });

  console.log("Seedowanie ukończone pomyślnie.");
}
const ex3Id = "ex-3-1-candle-gold";
