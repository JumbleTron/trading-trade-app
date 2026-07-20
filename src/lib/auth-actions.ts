import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function registerUser(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "Wszystkie pola są wymagane." };
  }

  if (password.length < 6) {
    return { error: "Hasło musi mieć co najmniej 6 znaków." };
  }

  try {
    const existing = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existing.length > 0) {
      return { error: "Użytkownik o tym adresie email już istnieje." };
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userId = `usr-${crypto.randomUUID()}`;

    await db.insert(users).values({
      id: userId,
      name,
      email,
      passwordHash,
      role: "user",
    });

    return { success: true };
  } catch (e) {
    return { error: "Wystąpił błąd podczas rejestracji." };
  }
}
