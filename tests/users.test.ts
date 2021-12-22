import { superoak } from "superoak/mod.ts";
import { Status } from "oak/mod.ts";
import { Bson } from "mongo/mod.ts";

import { User } from "../src/models/user.model.ts";

const mockUser: User = {
  username: "ablause",
  password: Date.now().toString(),
};
