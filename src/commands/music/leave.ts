/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import { Context } from '../../interfaces/context.js';
import { ExtendedClient } from '../../classes/client.js';
import { Command } from '../../classes/abstract/command.js';

export default class Leave extends Command {
  override player = true;
  override inSameVC = true;
  override aliases = ['dc', 'disconnect'];
  override description = 'Disconnect client from VC';

  override execute = async (client: ExtendedClient, ctx: Context) => {
    await ctx.guild.members.me!.voice.disconnect();

    await ctx.reply({
      embeds: [
        client
          .embed()
          .desc(
            `${client.emoji.check} Destroyed and disconnected the player.\n` +
              ((await client.db?.twoFourSeven.has(ctx.guild.id)) ?
                `${client.emoji.info} Disable 247 to prevent the bot from joining back.`
              : ``),
          ),
      ],
    });
  };
}

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
