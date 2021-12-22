import { verify } from "djwt/mod.ts";
import { Middleware, Status, STATUS_TEXT } from "oak/mod.ts";

const key = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-256" },
  true,
  ["sign", "verify"],
);

const authorization = (): Middleware => {
  return async (context, next) => {
    const authHeader = context.request.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      context.throw(Status.Unauthorized, STATUS_TEXT.get(Status.Unauthorized));
      return;
    }

    const isValidate = await verify(token, key);

    if (!isValidate) {
      context.throw(Status.Unauthorized, STATUS_TEXT.get(Status.Unauthorized));
      return;
    }

    next();
  };
};

export default authorization;
