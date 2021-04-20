export interface BaseSchema {
  readonly _id: { $oid: string };
}

export interface Restaurant {
  title: string;

  name: string;

  description?: string;

  medias?: any;

  menu?: any;

  contact?: {
    phone: string;
    email: string;
  };
}

export type RestaurantSchema = Restaurant & BaseSchema;