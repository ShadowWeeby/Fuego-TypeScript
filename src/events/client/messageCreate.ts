/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import { Message } from 'discord.js';
import { Events } from '../../interfaces/events.js';
import { Event } from '../../classes/abstract/event.js';
import { ExtendedClient } from '../../classes/client.js';
import { createContext } from '../../functions/contextFrom/message.js';

const event: keyof Events = 'messageCreate';

export default class MessageCreate implements Event<typeof event> {
  name = event;

  execute = async (client: ExtendedClient, message: Message) => {
    if (!message.author) return;
    if (message.author.bot) return;

    if (message.content.includes('jsk')) return void (await client.dokdo?.run(message));
    client.emit('ctxCreate', await createContext(client, message));
  };
}

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
