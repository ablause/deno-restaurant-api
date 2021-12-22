import { superoak } from "superoak/mod.ts";
import { Status } from "oak/mod.ts";
import { Bson } from "mongo/mod.ts";

import { Restaurant } from "../src/models/restaurant.schema.ts";
import app from "../src/app.ts";

const routePath = "/v1/restaurants";

const mockRestaurant: Restaurant = {
  _id: Bson.ObjectId.generate(),
  title: "myRestaurant",
  name: "my-restaurant",
};

Deno.test(`POST ${routePath} responds with status code ${Status.Created}`, async () => {
  const request = await superoak(app);

  await request
    .post(routePath)
    .send(mockRestaurant)
    .expect(Status.Created);
});

Deno.test(`GET ${routePath} responds with status code ${Status.OK}`, async () => {
  const request = await superoak(app);

  await request
    .get(routePath)
    .expect(Status.OK);
});

Deno.test(`GET ${routePath}/:id responds with status code ${Status.OK}`, async () => {
  const request = await superoak(app);

  await request
    .get(`${routePath}/${mockRestaurant._id}`)
    .expect(Status.OK);
});

Deno.test(`PATCH ${routePath}/:id responds with status code ${Status.NoContent}`, async () => {
  const request = await superoak(app);

  await request
    .patch(`${routePath}/${mockRestaurant._id}`)
    .send({ name: mockRestaurant.title + "-2" })
    .except(Status.NoContent);
});

Deno.test(`DELETE ${routePath}/:id responds with status code ${Status.NoContent}`, async () => {
  const request = await superoak(app);

  await request
    .delete(`${routePath}/${mockRestaurant._id}`)
    .expect(Status.NoContent);
});
