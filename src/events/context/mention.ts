/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import { Events } from '../../interfaces/events.js';
import { limited } from '../../utils/ratelimiter.js';
import { Context } from '../../interfaces/context.js';
import { Event } from '../../classes/abstract/event.js';
import { ExtendedClient } from '../../classes/client.js';

const event: keyof Events = 'mention';

export default class Mention implements Event<typeof event> {
  name = event;

  execute = async (client: ExtendedClient, ctx: Context) => {
    if (limited(ctx.author.id)) return void client.emit('blUser', ctx);

    await ctx.reply({
      embeds: [
        client
          .embed()
          .desc(
            `Hey ${ctx.author}, my global prefix is \`${client.prefix}\`.\n\n` +
              'What would you like to listen/do today ? \n' +
              `Use \`${client.prefix}help\` or \`/help\` to start your journey.`,
          ),
      ],
    });
  };
}

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
