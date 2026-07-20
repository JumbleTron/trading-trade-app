import { db } from "@/db";
import { courses, chapters, lessons, userProgress } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function getCoursesWithChapters() {
  const allCourses = await db.query.courses.findMany({
    orderBy: (courses, { asc }) => [asc(courses.orderIndex)],
    with: {
      chapters: {
        orderBy: (chapters, { asc }) => [asc(chapters.orderIndex)],
        with: {
          lessons: {
            orderBy: (lessons, { asc }) => [asc(lessons.orderIndex)],
          },
        },
      },
    },
  });
  return allCourses;
}

export async function getLessonWithDetails(lessonId: string) {
  const lesson = await db.query.lessons.findFirst({
    where: eq(lessons.id, lessonId),
    with: {
      chapter: {
        with: {
          course: true,
        },
      },
      exercises: {
        with: {
          options: true,
        },
      },
    },
  });
  return lesson;
}

export async function getUserCompletedLessons(userId: string) {
  const progress = await db
    .select({ lessonId: userProgress.lessonId })
    .from(userProgress)
    .where(eq(userProgress.userId, userId));
  return new Set(progress.map((p) => p.lessonId));
}

export async function completeLessonAction(userId: string, lessonId: string) {
  const existing = await db
    .select()
    .from(userProgress)
    .where(
      and(
        eq(userProgress.userId, userId),
        eq(userProgress.lessonId, lessonId)
      )
    )
    .limit(1);

  if (existing.length === 0) {
    const id = `prog-${userId}-${lessonId}`;
    await db.insert(userProgress).values({
      id,
      userId,
      lessonId,
    });
  }
  return { success: true };
}
