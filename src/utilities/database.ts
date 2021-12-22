import { MongoClient } from "mongo/mod.ts";

const client = new MongoClient();

const MONGO_URI = Deno.env.get("MONGO_URI");

if (!MONGO_URI) {
  throw new Error("Missing environment variable");
}

const database = await client.connect(MONGO_URI);

export default database;
