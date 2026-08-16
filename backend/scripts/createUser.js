const readline = require("readline");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

async function main() {
  console.log("\n=== Neuen Benutzer erstellen ===");

  const username = (await question("Benutzername: ")).trim();
  const password = (await question("Passwort: ")).trim();

  if (!username || !password) {
    console.error("❌ Benutzername und Passwort dürfen nicht leer sein.");
    process.exit(1);
  }

  if (password.length < 8) {
    console.error("❌ Das Passwort muss mindestens 8 Zeichen lang sein.");
    process.exit(1);
  }

  // Prüfen, ob Benutzer bereits existiert
  const existingUser = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUser) {
    console.error(`❌ Benutzer '${username}' existiert bereits.`);
    process.exit(1);
  }

  // Passwort sicher hashen (Salt Rounds: 12)
  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  console.log(`Benutzer '${username}' wurde erfolgreich erstellt!\n`);
}

main()
  .catch((e) => {
    console.error("Fehler:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
    rl.close();
  });