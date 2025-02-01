/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */
import { readdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));
export const loadEvents = async (client) => {
    let total = 0;
    for (const folder of await readdir(resolve(__dirname, '../events/'))) {
        const subFolder = resolve(__dirname, `../events/${folder}`);
        for (const file of await readdir(subFolder)) {
            if (!file.endsWith('.js'))
                continue;
            const event = new (await import(pathToFileURL(resolve(__dirname, subFolder, file)).href)).default();
            //@ts-expect-error there are no fucking errors here
            client.addListener(event.name, async (...args) => await event.execute(client, ...args));
            total++;
        }
    }
    client.log(`Loaded ${total} events`, 'success');
};
/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
