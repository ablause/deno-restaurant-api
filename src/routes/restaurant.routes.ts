import { Router, helpers } from "oak/mod.ts";
import { Bson } from 'mongo/mod.ts';

import { restaurants } from '../models/restaurant.model.ts';

const router = new Router({ prefix: '/restaurant' });

// GET ALL
router.get('/', async (ctx) => {
  const query = await restaurants
    .find()
    .next()

  ctx.response.body = query;
});

// GET ONE
router.get('/:id', async (ctx) => {
  const { id } = helpers.getQuery(ctx, { mergeParams: true });

  const query = await restaurants
    .findOne(id)

  ctx.response.body = query;
});

// CREATE
router.post('/', async (ctx) => {
  const { body } = ctx.request;

  if (!body) ctx.throw(400, 'Please provide data');

  const query = await restaurants
    .insertOne(body);

  ctx.response.body = query;
});

// UPDATE
router.put('/:id', async (ctx) => {
  const { id } = helpers.getQuery(ctx, { mergeParams: true });
  const { body } = ctx.request;

  await restaurants
    .updateOne({ _id: new Bson.ObjectId(id) }, body);

  ctx.response.status = 200;
});

// DELETE
router.delete('/', async (ctx) => {
  const { id } = ctx.params;

  const query = await restaurants
    .deleteOne({ _id: new Bson.ObjectId(id) });

  ctx.response.body = query;
});

export default router;