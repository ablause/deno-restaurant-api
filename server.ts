import "https://deno.land/x/dotenv@v2.0.0/load.ts";
import app from "./src/app.ts";

const PORT = Deno.env.get("PORT") ?? 3000;

app.addEventListener("error", (evt) => {
  console.log(evt.error);
});

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${hostname ??
      "localhost"}:${port}`,
  );
});

await app.listen({ port: Number(PORT), secure: false });
