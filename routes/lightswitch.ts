import { Hono } from "https://deno.land/x/hono@v3.2.1/mod.ts";

const lightswitch = new Hono();

lightswitch.get("/service/bulk/status", ctx => {
    const serviceId = ctx.req.query("serviceId");
    return ctx.json(serviceId ? [
        {
            serviceInstanceId: serviceId,
            status: "UP",
            message: "Selene is online",
            maintenanceUri: null,
            overrideCatalogIds: [
                "a7f138b2e51945ffbfdacc1af0541053"
            ],
            allowedActions: [],
            banned: false,
            launcherInfoDTO: {
                appName: "Fortnite",
                catalogItemId: "4fe75bbc5a674f4f9b356b5c90567da5",
                namespace: "fn"
            }
        }
    ] : []);
});

lightswitch.get("/service/:serviceId/status", ctx => {
    return ctx.json({
        serviceInstanceId: ctx.req.param().serviceId,
        status: "UP",
        message: "Selene is online",
        maintenanceUri: null,
        overrideCatalogIds: [
            "a7f138b2e51945ffbfdacc1af0541053"
        ],
        allowedActions: [],
        banned: false,
        launcherInfoDTO: {
            appName: "Fortnite",
            catalogItemId: "4fe75bbc5a674f4f9b356b5c90567da5",
            namespace: "fn"
        }
    });
});

export { lightswitch };