import { Hono } from "https://deno.land/x/hono@v3.2.1/mod.ts";
import { crypto, toHashString } from "https://deno.land/std@0.188.0/crypto/mod.ts";
import { exists } from "https://deno.land/std@0.188.0/fs/mod.ts";
import { errors, HttpException } from "../common/errors.ts";

const cloudstorage = new Hono();

cloudstorage.get("/system", async ctx => {
    const decoder = new TextDecoder("utf-8");
    const result: any[] = [];
    for await (const file of Deno.readDir("./hotfixes")) {
        const fpath = `./hotfixes/${file.name}`;
        const data = await Deno.readFile(fpath);
        result.push({
            uniqueFilename: file.name,
            filename: file.name,
            hash: toHashString(await crypto.subtle.digest("SHA-1", data)),
            hash256: toHashString(await crypto.subtle.digest("SHA-256", data)),
            length: decoder.decode(data).length,
            contentType: "text/plain",
            uploaded: (await Deno.lstat(fpath)).mtime,
            storageType: "S3",
            doNotCache: false
        });
    };
    return ctx.json(result);
});

cloudstorage.get("/system/:filename", async ctx => {
    const { filename } = ctx.req.param();
    if (!await exists(`./hotfixes/${filename}`)) throw new HttpException(errors.cloudstorage.file_not_found).withVars(filename);
    
    ctx.header("Content-Type", "text/plain");
    return ctx.body(await Deno.readFile(`./hotfixes/${filename}`));
});

cloudstorage.get("/system/config", ctx => ctx.text("", 404));

cloudstorage.get("/user/config", ctx => ctx.text("", 404));

export { cloudstorage };