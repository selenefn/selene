import { Hono } from "https://deno.land/x/hono@v3.2.1/mod.ts";
import { errors, HttpException } from "../errors.ts";
// import { tbValidator } from "https://esm.sh/@hono/typebox-validator@0.1.1";
// import { Type as T } from "https://esm.sh/@sinclair/typebox@0.28.11";

const account = new Hono();

account.get("/oauth/verify", ctx => {
    return ctx.json({
        "token": "1g63954g529b48b5a7084e6769cac7a5",
        "session_id": "1g63954g529b48b5a7084e6769cac7a5",
        "token_type": "bearer",
        "client_id": "ec684b8c687f479fadea3cb2ad83f5c6",
        "internal_client": true,
        "client_service": "prod-fn",
        "expires_in": 14400,
        "expires_at": "2023-05-23T03:18:48.226Z",
        "auth_method": "client_credentials",
        "product_id": "prod-fn",
        "application_id": "fghi4567FNFBKFz3E4TROb0bmPS8h1GW"
    })
});

account.post(
    "/oauth/token", async ctx => {
        const formData = await ctx.req.parseBody();
        const { grant_type } = formData;

        switch (grant_type) {
            case "authorization_code":
                const { code } = formData;
                if (!code) throw new HttpException(errors.common.invalid_request).withMessage("code is required.");
                break;
            case "client_credentials":
                break;
            case "exchange_code":
                const { exchange_code } = formData;
                if (!exchange_code) throw new HttpException(errors.common.invalid_request).withMessage("exchange_code is required.");
                break;
            case "refresh_token":
                const { refresh_token } = formData;
                if (!refresh_token) throw new HttpException(errors.common.invalid_request).withMessage("refresh_token is required.");
                break;
            case "password":
                const { username, password } = formData;
                if (!username) throw new HttpException(errors.common.invalid_request).withMessage("username is required.");
                if (!password) throw new HttpException(errors.common.invalid_request).withMessage("password is required.");
                break;
            default:
                throw new HttpException(errors.oauth.unsupported_grant_type).withVars(grant_type.toString());
        };

        return ctx.json(grant_type === "client_credentials" ? {
            "access_token": "1g63954g529b48b5a7084e6769cac7a5",
            "expires_in": 14400,
            "expires_at": "2023-05-23T03:18:49.043Z",
            "token_type": "bearer",
            "client_id": "ec684b8c687f479fadea3cb2ad83f5c6",
            "internal_client": true,
            "client_service": "prod-fn",
            "product_id": "prod-fn",
            "application_id": "fghi4567FNFBKFz3E4TROb0bmPS8h1GW"
        } : {
            "access_token": "1g63954g529b48b5a7084e6769cac7a5",
            "expires_in": 7200,
            "expires_at": "",
            "token_type": "bearer",
            "refresh_token": "1g63954g529b48b5a7084e6769cac7a5",
            "refresh_expires": 28800,
            "refresh_expires_at": "2023-05-07T20:38:16.066Z",
            "account_id": "3de654385bf64a9686614cdc999d2d21",
            "client_id": "ec684b8c687f479fadea3cb2ad83f5c6",
            "internal_client": true,
            "client_service": "prod-fn",
            "displayName": "NarcissisticApe",
            "app": "prod-fn",
            "in_app_id": "3de654385bf64a9686614cdc999d2d21",
            "device_id": "1g63954g529b48b5a7084e6769cac7a5",
            "product_id": "prod-fn",
            "application_id": "fghi4567FNFBKFz3E4TROb0bmPS8h1GW"
        });
    }
);

export { account };