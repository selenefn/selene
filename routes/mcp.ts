import { Context, Hono } from "https://deno.land/x/hono@v3.2.1/mod.ts";

const mcp = new Hono();

mcp.get("/version", async (ctx: Context) => {
    return ctx.json({
        "app": "fortnite",
        "serverDate": new Date(),
        "overridePropertiesVersion": "unknown",
        "cln": "2870186",
        "build": "1",
        "moduleName": "Fortnite-Core",
        "buildDate": "2016-03-28T04:00:00.000Z",
        "version": "0.6.5",
        "branch": "Release-0.6.5",
        "modules": {
            "Epic-LightSwitch-AccessControlCore": {
                "cln": "24565549",
                "build": "b2144",
                "buildDate": "2016-03-28T04:00:00.000Z",
                "version": "0.0.1",
                "branch": "trunk"
            },
            "epic-xmpp-api-v1-base": {
                "cln": "5131a23c1470acbd9c94fae695ef7d899c1a41d6",
                "build": "b3595",
                "buildDate": "2016-03-28T04:00:00.000Z",
                "version": "0.0.1",
                "branch": "master"
            },
            "epic-common-core": {
                "cln": "0e2eb675e9c593f0774c89e5800206a70f3248cc",
                "build": "b1230",
                "buildDate": "2016-03-28T04:00:00.000Z",
                "version": "0.0.1",
                "branch": "master"
            }
        }
    });
});

export default mcp;