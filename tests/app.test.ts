import "https://deno.land/x/dotenv@v2.0.0/load.ts";
import { superoak } from "https://deno.land/x/superoak@4.1.0/mod.ts";
import { Status } from "https://deno.land/std@0.94.0/http/mod.ts";
import app from "../src/app.ts";

const startTime = Date.now();
let restaurantId: string;

Deno.test(`POST /restaurants responds with status code ${Status.Created}`, async () => {
  const request = await superoak(app);

  await request
    .post("/v1/restaurants")
    .send({ name: `restaurant-${startTime}`, title: "myRestaurant" })
    .expect(Status.Created)
    .then((res) => {
      const { document } = JSON.parse(res.text);
      restaurantId = document._id;
    });
});

Deno.test(`GET /restaurants responds with status code ${Status.OK}`, async () => {
  const request = await superoak(app);

  await request
    .get("/v1/restaurants")
    .expect(Status.OK);
});

Deno.test(`GET /restaurants/:id responds with status code ${Status.OK}`, async () => {
  const request = await superoak(app);

  await request
    .get(`/v1/restaurants/${restaurantId}`)
    .expect(Status.OK);
});

Deno.test(`DELETE /restaurants/:id responds with status code ${Status.NoContent}`, async () => {
  const request = await superoak(app);

  await request
    .delete(`/v1/restaurants/${restaurantId}`)
    .expect(Status.NoContent);
});
