import app from './src/app.ts';

const PORT = Deno.env.get('PORT') ?? 3000

await app.listen({ port: Number(PORT), secure: false });
