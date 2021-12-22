import app from "./src/app.ts";

const PORT = Deno.env.get('PORT');

app.addEventListener("error", (evt) => {
  console.error(evt.error);
});

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${
      hostname ??
        "localhost"
    }:${port}`,
  );
});

await app.listen({ port: Number(PORT) });
