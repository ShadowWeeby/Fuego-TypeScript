/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import { Context } from '../../interfaces/context.js';
import { Command } from '../../classes/abstract/command.js';

export const resolvePerms = {
  basic: async (ctx: Context) => {
    return ctx.guild.members
      .me!.permissionsIn(ctx.channel)
      ?.has(['ViewChannel', 'ReadMessageHistory', 'SendMessages', 'EmbedLinks'], true);
  },

  user: async (ctx: Context, command: Command, botAdmin: boolean) => {
    if (!command.userPerms.length) return true;

    const missingUserPermissions = ctx.member
      ?.permissionsIn(ctx.channel)
      .missing([...command.userPerms], true);

    if (!botAdmin && missingUserPermissions?.length) {
      await ctx.reply({
        embeds: [
          ctx.client
            .embed()
            .desc(
              `${ctx.client.emoji.cross} You need ${missingUserPermissions.join(
                ', ',
              )} permission(s) to execute the command ${command.name}.`,
            ),
        ],
      });
      return false;
    }
    return true;
  },
};

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
