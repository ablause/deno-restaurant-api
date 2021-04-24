import { MongoClient } from "https://deno.land/x/mongo@v0.22.0/mod.ts";

const client = new MongoClient();
const MONGO_URI = Deno.env.get("MONGO_URI")!;

const database = await client.connect(MONGO_URI);

export default database;
