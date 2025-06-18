import db from "./db";
import * as schemas from "./schemas";
import { reset } from "drizzle-seed";

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
  console.log("\nseeding finished !");
}

main();
