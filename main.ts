import { Hono, Context } from "https://deno.land/x/hono@v3.2.1/mod.ts";
import { serve } from "https://deno.land/std@0.188.0/http/server.ts";
import { version } from "./middleware/version.ts";
import { lightswitch } from "./routes/lightswitch.ts";
import { mcp } from "./routes/mcp.ts";
import { account } from "./routes/account.ts";
import { HttpException, errors } from "./errors.ts";

const serv = new Hono();

serv.use("/:service/api/version", version);

serv.onError((err, ctx) => ctx.json((err instanceof HttpException ? err as HttpException : new HttpException(errors.unknown)).build()));

serv.get("/", async (c: Context) => {
    return c.json({ message: "Hello, selene!" });
});

serv.route("/account/api", account);
serv.route("/lightswitch/api", lightswitch);
serv.route("/fortnite/api", mcp);

serve(serv.fetch, { port: 8080 });