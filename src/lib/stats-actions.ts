import { db } from "@/db";
import { userProgress, userExerciseAttempts, lessons } from "@/db/schema";
import { eq, and, sql } from "drizzle-orm";

export async function getUserStats(userId: string) {
  // 1. Zliczanie ukończonych lekcji
  const progressCount = await db
    .select({ count: sql<number>`count(*)` })
    .from(userProgress)
    .where(eq(userProgress.userId, userId));

  // 2. Łączna liczba prób ćwiczeń
  const attempts = await db
    .select()
    .from(userExerciseAttempts)
    .where(eq(userExerciseAttempts.userId, userId));

  const totalAttempts = attempts.length;
  const correctAttempts = attempts.filter((a) => a.isCorrect).length;
  const accuracy = totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 0;

  // 3. Ostatnio ukończone lekcje
  const recentProgress = await db
    .select({
      lessonId: userProgress.lessonId,
      completedAt: userProgress.completedAt,
      lessonTitle: lessons.title,
    })
    .from(userProgress)
    .innerJoin(lessons, eq(userProgress.lessonId, lessons.id))
    .where(eq(userProgress.userId, userId))
    .orderBy(userProgress.completedAt)
    .limit(5);

  return {
    completedLessons: progressCount[0]?.count || 0,
    totalAttempts,
    correctAttempts,
    accuracy,
    recentProgress,
  };
}
