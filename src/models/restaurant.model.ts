import database from '../utilities/database.ts';
import type { RestaurantSchema } from '../types.ts';

const restaurants = database.collection<RestaurantSchema>('restaurants');

export { restaurants };