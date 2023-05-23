import { Hono } from "https://deno.land/x/hono@v3.2.1/mod.ts";
import { cloudstorage } from "./cloudstorage.ts";

const mcp = new Hono();

mcp.route("/cloudstorage", cloudstorage);

export { mcp };