/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import { ActionRowBuilder } from 'discord.js';
import { Context } from '../../interfaces/context.js';
import { ExtendedClient } from '../../classes/client.js';
import { Command } from '../../classes/abstract/command.js';
import { ExtendedButtonBuilder } from '../../classes/button.js';

export default class Vote extends Command {
  description = 'Shows top.gg vote link';

  execute = async (client: ExtendedClient, ctx: Context) => {
    await ctx.reply({
      components: [
        new ActionRowBuilder<ExtendedButtonBuilder>().addComponents([
          client
            .button()
            .link('ㅤVote me on Top.gg (DBL)ㅤ', `https://top.gg/bot/${client.user?.id}/vote`),
        ]),
      ],
    });
  };
}

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
