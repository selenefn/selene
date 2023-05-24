import { Hono, Context } from "https://deno.land/x/hono@v3.2.1/mod.ts";
import { serve } from "https://deno.land/std@0.188.0/http/server.ts";
import { version } from "./middleware/version.ts";
import { HttpException, errors } from "./errors.ts";
import { account } from "./routes/account.ts";
import { lightswitch } from "./routes/lightswitch.ts";
import { fortnite } from "./routes/fortnite.ts";

const serv = new Hono();

serv.use("/:service/api/version", version);

serv.onError((err: Error, ctx: Context) => {
    const exception = err instanceof HttpException ? err as HttpException : new HttpException(errors.common.unknown_error);
    return ctx.json(exception.build(), exception.httpStatus);
});

serv.get("/", ctx => {
    return ctx.json({ message: "Hello, selene!" });
});

serv.route("/account/api", account);
serv.route("/fortnite/api", fortnite);
serv.route("/lightswitch/api", lightswitch);

serve(serv.fetch, { port: 8080 });