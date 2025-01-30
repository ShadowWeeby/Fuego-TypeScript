/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import { Context } from '../../interfaces/context.js';
import { ExtendedClient } from '../../classes/client.js';
import { Command } from '../../classes/abstract/command.js';

export default class Config extends Command {
  override aliases = ['cnf'];
  description = 'Shows server config';

  execute = async (client: ExtendedClient, ctx: Context) => {
    const twoFourSeven = await client.db.twoFourSeven.get(ctx.guild?.id);

    await ctx.reply({
      embeds: [
        client
          .embed()
          .setAuthor({
            name: 'Configuration overview',
            iconURL: ctx.guild.iconURL({ size: 4096 }) || client.user!.displayAvatarURL(),
          })
          .desc(
            `${client.emoji.check} **My prefix for this server is ${client.config.prefix}**\n\n` +
              `${client.emoji[twoFourSeven ? 'check' : 'cross']} **247 status :** ${twoFourSeven ? `Enabled` : 'Disabled'}\n\n` +
              `${client.emoji[twoFourSeven ? 'info' : 'warn']} **247 TextChannel :** ${twoFourSeven?.textId ? `<#${twoFourSeven.textId}>` : 'Disabled'}\n` +
              `${client.emoji[twoFourSeven ? 'info' : 'warn']} **247 VoiceChannel :** ${twoFourSeven?.voiceId ? `<#${twoFourSeven.voiceId}>` : 'Disabled'}\n` +
              `${twoFourSeven ? `` : `${client.emoji.info} Come on man, enable it, its free!`}`,
          ),
      ],
    });
  };
}

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
