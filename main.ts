import { Hono, Context } from "https://deno.land/x/hono@v3.2.1/mod.ts";
import { serve } from "https://deno.land/std@0.188.0/http/server.ts";
import { version } from "./middleware/version.ts";
import { logger } from "./middleware/logger.ts";
import { HttpException, errors } from "./common/errors.ts";
import { account } from "./routes/account.ts";
import { lightswitch } from "./routes/lightswitch.ts";
import { fortnite } from "./routes/fortnite.ts";
import { Config, loadConfig } from "./common/config.ts";
import { createLogger } from "./common/logger.ts";
import chalk from "https://esm.sh/v124/chalk@5.2.0/source/index.js";

console.log(chalk.hex("#d2bbe2")(`
 .|'''.|          '||                           
 ||..  '    ....   ||    ....  .. ...     ....  
  ''|||.  .|...||  ||  .|...||  ||  ||  .|...|| 
.     '|| ||       ||  ||       ||  ||  ||      
 |'...|'   '|...' .||.  '|...' .||. ||.  '|...'
`))

export const log = await createLogger("log.txt");

export let config = {} as Config;
try {
    config = await loadConfig("config.toml");
} catch (err) {
    log.fatal(err);
};

const serv = new Hono();

if (config.debug) serv.use("*", logger(log.debug));
serv.use("/:service/api/version", version);

serv.onError((err: Error, ctx: Context) => {
    const exception = err instanceof HttpException ? err : new HttpException(errors.common.unknown_error);
    return ctx.json(exception.build(), exception.httpStatus);
});

serv.get("/", ctx => {
    return ctx.json({ message: "Hello, selene!" });
});

serv.route("/account/api", account);
serv.route("/fortnite/api", fortnite);
serv.route("/lightswitch/api", lightswitch);

serve(serv.fetch, {
    port: config.port,
    onListen({ port, hostname }) {
        log.info(`Server started at http://${hostname}:${port}`);
    }
});