import db from "./db";
import * as schemas from "./schemas";
import { reset } from "drizzle-seed";
import bcrypt from "bcrypt";

async function main() {
  console.log("seeding started !");

  console.log("\n===reseting database !===");
  await reset(db, schemas);

  await db.insert(schemas.gameTable).values([
    { name: "Rocket League", imageUrl: "" },
    {
      name: "Valorant",
      imageUrl: "",
    },
    {
      name: "League of Lengends",
      imageUrl: "",
    },
    {
      name: "Counter-Strike",
      imageUrl: "",
    },
  ]);

  await db.insert(schemas.usersTable).values({
    email: "user@example.com",
    hashedPassword: await bcrypt.hash("user", 10),
    pseudonym: "Utilisateur d'exemple",
  });

  console.log("\nseeding finished !");
  process.exit(0);
}

main();
