import { Hono } from "https://deno.land/x/hono@v3.2.1/mod.ts";
import { cloudstorage } from "./cloudstorage.ts";
import { mcp } from "./mcp.ts";

const fortnite = new Hono();

fortnite.route("/cloudstorage", cloudstorage);
fortnite.route("/game/v2/profile", mcp);

export { fortnite };