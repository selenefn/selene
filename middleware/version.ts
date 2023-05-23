import { Context, Next } from "https://deno.land/x/hono@v3.2.1/mod.ts";

export const version = async (ctx: Context, next: Next) => {
    await next();
    return ctx.json({
        "app": ctx.req.param().service,
        "serverDate": new Date(),
        "overridePropertiesVersion": "unknown",
        "cln": "unknown",
        "build": "unknown",
        "moduleName": "unknown",
        "buildDate": new Date(),
        "version": "unknown",
        "branch": "unknown",
        "modules": {}
    });
};