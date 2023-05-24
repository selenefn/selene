import chalk from "https://esm.sh/chalk@5.2.0";

export async function createLogger(fpath: string) {
    const file = await Deno.open(fpath, { create: true, write: true, append: true });
    const encoder = new TextEncoder();

    return {
        info(...data: any[]) {
            console.log(chalk.hex("#d2bbe2")("[INFO]"), ...data);
            file.write(encoder.encode(`\n[${new Date().toLocaleString()}] [INFO] ${data}`));
        },
        debug(...data: any[]) {
            console.log(chalk.hex("#71abff")("[DEBUG]"), ...data);
            file.write(encoder.encode(`\n[${new Date().toLocaleString()}] [DEBUG] ${data}`));
        },
        warn(...data: any[]) {
            console.log(chalk.hex("#fff071")("[WARN]"), ...data);
            file.write(encoder.encode(`\n[${new Date().toLocaleString()}] [WARN] ${data}`));
        },
        error(...data: any[]) {
            console.log(chalk.hex("#ff6565")("[ERROR]"), ...data);
            file.write(encoder.encode(`\n[${new Date().toLocaleString()}] [ERROR] ${data}`));
        },
        fatal(...data: any[]) {
            this.error(...data);
            Deno.exit(5);
        }
    };
};