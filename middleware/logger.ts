import { Context, Next } from "https://deno.land/x/hono@v3.2.1/mod.ts";

export const logger = (logFunc: any) => {
    return async (ctx: Context, next: Next) => {
        await next();
        logFunc(`${ctx.req.method}: ${new URL(ctx.req.url).href}`);
    };
};