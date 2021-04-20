import { Application } from "oak/mod.ts";
import { restaurantRouter } from './routes/mod.ts'

const app = new Application();

app.addEventListener("error", (evt) => {
  console.log(evt.error);
});

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${hostname ??
      "localhost"}:${port}`,
  );
});

// Routes :
app.use(restaurantRouter.routes())
  .use(restaurantRouter.allowedMethods());

export default app;