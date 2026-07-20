import {
  mysqlTable,
  varchar,
  text,
  int,
  timestamp,
  double,
  boolean,
  primaryKey
} from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

// 1. Użytkownicy (powiązani z NextAuth)
export const users = mysqlTable("users", {
  id: varchar("id", { length: 255 }).primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: timestamp("email_verified", { mode: "date", fsp: 3 }),
  image: varchar("image", { length: 255 }),
  passwordHash: varchar("password_hash", { length: 255 }),
  role: varchar("role", { length: 50 }).default("user").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().onUpdateNow().notNull(),
});

// 2. Kursy
export const courses = mysqlTable("courses", {
  id: varchar("id", { length: 255 }).primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  level: varchar("level", { length: 50 }).notNull(), // np. beginner, intermediate, advanced
  marketType: varchar("market_type", { length: 50 }).notNull(), // np. gold, oil, forex, index, all
  orderIndex: int("order_index").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

// 3. Rozdziały
export const chapters = mysqlTable("chapters", {
  id: varchar("id", { length: 255 }).primaryKey(),
  courseId: varchar("course_id", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  orderIndex: int("order_index").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

// 4. Lekcje
export const lessons = mysqlTable("lessons", {
  id: varchar("id", { length: 255 }).primaryKey(),
  chapterId: varchar("chapter_id", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  contentJson: text("content_json").notNull(), // przechowuje treść lekcji (blokową lub MDX-like)
  lessonType: varchar("lesson_type", { length: 50 }).notNull(), // np. theory, practice, quiz
  durationMin: int("duration_min").default(5).notNull(),
  orderIndex: int("order_index").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

// 5. Ćwiczenia interaktywne
export const exercises = mysqlTable("exercises", {
  id: varchar("id", { length: 255 }).primaryKey(),
  lessonId: varchar("lesson_id", { length: 255 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(), // np. quiz, predict_reveal, draw_levels
  chartDataJson: text("chart_data_json"), // dane świecowe [open, high, low, close, time, volume]
  question: text("question").notNull(),
  correctAnswer: varchar("correct_answer", { length: 255 }).notNull(), // np. "BUY", "SELL", "A", "B" etc.
  explanation: text("explanation"), // dlaczego taka decyzja była poprawna
  market: varchar("market", { length: 50 }).notNull(), // np. XAUUSD, OIL, EURUSD, EURPLN, US500
  timeframe: varchar("timeframe", { length: 10 }).notNull(), // np. M15, H1, H4, D1
  difficulty: varchar("difficulty", { length: 50 }).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

// Opcje do pytań zamkniętych (jeśli ćwiczenie to quiz)
export const exerciseOptions = mysqlTable("exercise_options", {
  id: varchar("id", { length: 255 }).primaryKey(),
  exerciseId: varchar("exercise_id", { length: 255 }).notNull(),
  optionText: varchar("option_text", { length: 255 }).notNull(),
  isCorrect: boolean("is_correct").notNull(),
});

// 6. Postęp lekcji użytkownika
export const userProgress = mysqlTable("user_progress", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  lessonId: varchar("lesson_id", { length: 255 }).notNull(),
  status: varchar("status", { length: 50 }).default("completed").notNull(),
  completedAt: timestamp("completed_at", { mode: "date" }).defaultNow().notNull(),
});

// 7. Próby ćwiczeń (aby wiedzieć, czy dobrze ocenił BUY/SELL i co zaznaczył)
export const userExerciseAttempts = mysqlTable("user_exercise_attempts", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  exerciseId: varchar("exercise_id", { length: 255 }).notNull(),
  selectedAnswer: varchar("selected_answer", { length: 255 }).notNull(),
  isCorrect: boolean("is_correct").notNull(),
  attemptedAt: timestamp("attempted_at", { mode: "date" }).defaultNow().notNull(),
});

// --- RELACJE ---

export const usersRelations = relations(users, ({ many }) => ({
  progress: many(userProgress),
  attempts: many(userExerciseAttempts),
}));

export const coursesRelations = relations(courses, ({ many }) => ({
  chapters: many(chapters),
}));

export const chaptersRelations = relations(chapters, ({ one, many }) => ({
  course: one(courses, { fields: [chapters.courseId], references: [courses.id] }),
  lessons: many(lessons),
}));

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  chapter: one(chapters, { fields: [lessons.chapterId], references: [chapters.id] }),
  exercises: many(exercises),
  userProgress: many(userProgress),
}));

export const exercisesRelations = relations(exercises, ({ one, many }) => ({
  lesson: one(lessons, { fields: [exercises.lessonId], references: [lessons.id] }),
  options: many(exerciseOptions),
  attempts: many(userExerciseAttempts),
}));

export const exerciseOptionsRelations = relations(exerciseOptions, ({ one }) => ({
  exercise: one(exercises, { fields: [exerciseOptions.exerciseId], references: [exercises.id] }),
}));

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  user: one(users, { fields: [userProgress.userId], references: [users.id] }),
  lesson: one(lessons, { fields: [userProgress.lessonId], references: [lessons.id] }),
}));

export const userExerciseAttemptsRelations = relations(userExerciseAttempts, ({ one }) => ({
  user: one(users, { fields: [userExerciseAttempts.userId], references: [users.id] }),
  exercise: one(exercises, { fields: [userExerciseAttempts.exerciseId], references: [exercises.id] }),
}));
