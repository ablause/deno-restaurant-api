import * as Oak from "oak/mod.ts";

export interface State extends Oak.State {
  clients: Map<string, Oak.ServerSentEventTarget>;
}

export interface Context extends Oak.Context<State> {
  // deno-lint-ignore no-explicit-any
  params: Record<string, any>;
  user: { permissions: string[] };
}

export type Middleware = Oak.Middleware<State, Context>;

export type Query = Record<string, unknown> & {
  fields?: string[];
  offset?: number;
  limit?: number;
};
