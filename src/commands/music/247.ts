/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import { Context } from '../../interfaces/context.js';
import { ExtendedClient } from '../../classes/client.js';
import { Command } from '../../classes/abstract/command.js';

export default class Autoplay extends Command {
  override player = true;
  override inSameVC = true;
  override description = 'Toggle 247 mode';

  override execute = async (client: ExtendedClient, ctx: Context) => {
    const currentStatus = await client.db.twoFourSeven.get(ctx.guild.id);

    if (currentStatus) {
      await client.db.twoFourSeven.delete(ctx.guild.id);

      await ctx.reply({
        embeds: [
          client
            .embed()
            .desc(`${client.emoji.check} Deleted 247 data and set 247 mode to \`disabled\`.`),
        ],
      });
      return;
    }

    const player = client.getPlayer(ctx);

    await client.db.twoFourSeven.set(ctx.guild.id, {
      textId: player!.textId,
      voiceId: player!.voiceId,
    });

    await ctx.reply({
      embeds: [
        client
          .embed()
          .desc(
            `${client.emoji.check} 247 is now \`enabled\`.\n\n` +
              `${client.emoji.info} Configured as text channel : <#${player!.textId}> and ` +
              `voice channel : <#${player!.voiceId}>.`,
          ),
      ],
    });
  };
}

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
