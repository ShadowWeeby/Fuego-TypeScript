/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import { loadAntiCrash } from './utils/anticrash.js';
import { ExtendedClient } from './classes/client.js';

console.clear();

loadAntiCrash();

export default new ExtendedClient().connectToGateway();

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
