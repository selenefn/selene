import chalk from "https://esm.sh/chalk@5.2.0";
import { exists } from "https://deno.land/std@0.188.0/fs/mod.ts";
import { parse, stringify } from "https://deno.land/std@0.188.0/toml/mod.ts";
import { log } from "../main.ts";

export type Config = {
    debug: boolean;
};

const defaultConfig: Config = {
    debug: false
};

export async function loadConfig(fpath: string): Promise<Config> {
    if (!(await exists(fpath))) {
        log.warn("Unable to locate configation file at", `${fpath},`, "creating default config...");
        await Deno.writeFile(fpath, (new TextEncoder).encode(stringify(defaultConfig)));
        log.info("Default configuration file written to", fpath);
    };
    
    let cfg;
    try {
        cfg = parse(new TextDecoder().decode(await Deno.readFile(fpath))) as Config;
    } catch (err) {
        throw new Error(`an error occurred during ${chalk.cyan("toml::parse")} while attempting to parse the config file\n    ${(err as Error).message}`)
    };

    // this is cursed af, but it works ig
    for (const entry of Object.entries(defaultConfig)) {
        // @ts-expect-error
        if (typeof entry[1] !== typeof cfg[entry[0]]) throw new Error(`unable to load config data from file due to the value of '${chalk.cyan(entry[0])}' being type '${chalk.magenta(typeof cfg[entry[0]])}' when it should be of type '${chalk.magenta(typeof entry[1])}'`);
    };

    return cfg;
};