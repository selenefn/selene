import { Hono, Context } from "https://deno.land/x/hono@v3.2.1/mod.ts";
import { serve } from "https://deno.land/std@0.188.0/http/server.ts";
import lightswitch from "./routes/lightswitch.ts";
import mcp from "./routes/mcp.ts";

const serv = new Hono();

serv.get("/", async (c: Context) => {
    return c.json({ message: "Hello, selene!" });
});

serv.route("/lightswitch/api", lightswitch);
serv.route("/fortnite/api", mcp);

serve(serv.fetch, { port: 8080 });