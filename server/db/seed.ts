import db from "@/server/db/db";
import { gameTable } from "@/server/db/schemas/game/game";

async function main() {
  console.log("seeding started !");

  await db.insert(gameTable).values({ name: "Rocket League" });
  console.log("\nseeding finished !");
}

main();
