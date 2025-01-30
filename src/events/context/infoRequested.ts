/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import { Events } from '../../interfaces/events.js';
import { Context } from '../../interfaces/context.js';
import { Event } from '../../classes/abstract/event.js';
import { ExtendedClient } from '../../classes/client.js';
import { Command } from '../../classes/abstract/command.js';

const event: keyof Events = 'infoRequested';

export default class InfoRequested implements Event<typeof event> {
  name = event;

  execute = async (client: ExtendedClient, ctx: Context, command: Command) => {
    await ctx.reply({
      embeds: [
        client
          .embed()
          .desc(
            `${client.emoji.check} **Command info :**\n\n` +
              `${client.emoji.info} **Name :** ${command.name}\n` +
              `${client.emoji.info} **Aliases :** ${`${command.aliases.join(', ')}` || 'No aliases found'}\n` +
              `${client.emoji.info} **Usage :** ${client.prefix}${command.name} ${command.usage}\n` +
              `${client.emoji.info} **Desc :** ${command.description}\n`,
          ),
      ],
    });
  };
}

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
