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

export default class Invite extends Command {
  override aliases = ['inv'];
  description = 'Shows my invite links';

  execute = async (client: ExtendedClient, ctx: Context) => {
    await ctx.reply({
      embeds: [
        client
          .embed()
          .desc(
            `${client.emoji.check} Click one of the buttons to add me.\n` +
              `${client.emoji.info} Admin is recommended -> ease of use.`,
          ),
      ],
      components: [
        new ActionRowBuilder<ExtendedButtonBuilder>().addComponents([
          client.button().link('ㅤAdministratorㅤ', client.invite.admin()),
          client.button().link('Basic ㅤ', client.invite.required()),
        ]),
      ],
    });
  };
}

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
