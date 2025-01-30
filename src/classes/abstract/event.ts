/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import { ExtendedClient } from '../client.js';
import { Events } from '../../interfaces/events.js';

export abstract class Event<T extends keyof Events> {
  abstract name: string;
  abstract execute(client: ExtendedClient, ...args: Events[T]): Promise<unknown>;
}

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
