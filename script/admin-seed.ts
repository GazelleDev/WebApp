import { seedAdminAndContent } from "../server/seed";

async function main() {
  const result = await seedAdminAndContent();
  console.log(
    `Seed complete for ${result.adminEmail}. Seeded documents: ${
      result.seededDocuments.length ? result.seededDocuments.join(", ") : "none"
    }. Seeded menu: ${result.seededMenu ? "yes" : "no"}.`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
