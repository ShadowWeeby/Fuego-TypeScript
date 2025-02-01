/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */
import JOSH from '@joshdb/core';
// @ts-expect-error no declaration file for the imported module
import provider from '@joshdb/json';
export const josh = (name) => {
    return new JOSH({
        name,
        provider,
        providerOptions: {
            dataDir: `./database-storage/${name}`,
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    });
};
/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
