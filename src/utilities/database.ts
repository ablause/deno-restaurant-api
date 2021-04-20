import { MongoClient } from "mongo/mod.ts";

// class Database {
//   #client = new MongoClient();

//   constructor(private options: string | ConnectOptions) {}

//   connect() {
//     this.#client.connect(this.options);
//   }
// }

const client = new MongoClient();

const database = await client.connect('')

export default database;