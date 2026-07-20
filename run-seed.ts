import { seedInitialCourseData } from "./src/db/seed";

async function main() {
  try {
    await seedInitialCourseData();
    process.exit(0);
  } catch (error) {
    console.error("Błąd podczas seedowania bazy danych:", error);
    process.exit(1);
  }
}

main();
