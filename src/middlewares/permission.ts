import { composeMiddleware, Middleware } from "oak/mod.ts";
import authorization from "./authorization.ts";
import { State } from "../types/mod.ts";

const permission = (permission: string): Middleware<State> => {
  return composeMiddleware([authorization(), (context, next) => {
    const { user } = context.state;

    if (user?.permissions.includes(permission)) {
      next();
    }
  }]);
};

export default permission;
