/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import moment from 'moment-timezone';
import { ActionRowBuilder } from 'discord.js';
import { Events } from '../../interfaces/events.js';
import { Context } from '../../interfaces/context.js';
import { Event } from '../../classes/abstract/event.js';
import { ExtendedClient } from '../../classes/client.js';
import { ExtendedButtonBuilder } from '../../classes/button.js';

const event: keyof Events = 'blUser';

export default class BlacklistUser implements Event<typeof event> {
  name = event;

  execute = async (client: ExtendedClient, ctx: Context) => {
    await client.db.blacklist.set(ctx.author.id, true);

    const replyObject = {
      embeds: [
        client
          .embed('#000000')
          .desc(
            `**Dear ${ctx.author},**\n\n` +
              `${client.emoji.bl} You have been flagged and blacklisted by anti-spam.\n` +
              `${client.emoji.info} Open a ticket @ my **[\`Support Server\`](${client.config.links.support})** for further info.`,
          ),
      ],
      components: [
        new ActionRowBuilder<ExtendedButtonBuilder>().addComponents(
          client.button().link('Support Server', client.config.links.support),
        ),
      ],
    };
    await ctx.react(client.emoji.bl, {
      content:
        'You have been flagged and blacklisted by my anti-spam !!!!!\n' +
        'Check your DMs for more information.',
    });
    await ctx.author.send(replyObject).catch(() => null);

    await client.webhooks.blLogs.send({
      username: `Auto-blacklist-logs`,
      avatarURL: `${client.user?.displayAvatarURL()}`,
      embeds: [
        client
          .embed()
          .desc(
            `${client.emoji.bl} Blacklisted an user (${moment().tz('Asia/Kolkata')})\n\n` +
              `${client.emoji.info} **User :** ${ctx.author.tag} \`[${ctx.author.id}]\`\n` +
              `${client.emoji.info} **Guild :** ${ctx.guild.name.substring(0, 20)} \`[${ctx.guild.id}]\`\n` +
              `${client.emoji.info} **Channel :** ${ctx.channel.name} \`[${ctx.channel.id}]\``,
          ),
      ],
    });
  };
}

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
