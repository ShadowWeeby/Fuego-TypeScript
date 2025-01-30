/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import moment from 'moment-timezone';
import { Events } from '../../interfaces/events.js';
import { ActionRowBuilder, Guild } from 'discord.js';
import { Event } from '../../classes/abstract/event.js';
import { ExtendedClient } from '../../classes/client.js';
import { ExtendedButtonBuilder } from '../../classes/button.js';

const event: keyof Events = 'guildCreate';

export default class GuildCreate implements Event<typeof event> {
  name = event;

  execute = async (client: ExtendedClient, guild: Guild) => {
    if (!guild?.name) return;

    const owner = await guild.fetchOwner({ force: true }).catch(() => null);

    const logs = await guild.fetchAuditLogs({ type: 28 }).catch(() => null);
    const adder =
      logs?.entries.filter((entry) => entry.target?.id === client.user!.id).first()?.executor ||
      null;

    const obj = {
      embeds: [
        client
          .embed('Green')
          .title(`Thank you for choosing ${client.user!.username}!`)
          .desc(
            `${client.emoji.check} ${
              client.user
            } has been successfully added to \`${guild.name}\`.\n\n` +
              `${client.emoji.info} You can report any issues at my **[\`Support Server\`](${client.config.links.support})** or you can use \`${client.prefix}report\`. ` +
              `You can also reach out to my **[\`Developers\`](${client.config.links.support})** if you want to know more about me.`,
          ),
      ],
      components: [
        new ActionRowBuilder<ExtendedButtonBuilder>().addComponents(
          client.button().link('Support Server', `${client.config.links.support}`),
        ),
      ],
    };

    await owner?.send(obj).catch(() => null);
    if (adder?.id !== owner?.id) await adder?.send(obj).catch(() => null);

    await client.webhooks.guildLogs.send({
      username: `GuildCreate-logs`,
      avatarURL: `${client.user?.displayAvatarURL()}`,
      embeds: [
        client
          .embed('Green')
          .desc(
            `${client.emoji.check} **Joined a guild (${moment().tz('Asia/Kolkata')})**\n\n` +
              `**${guild.name}**\n\n` +
              `${client.emoji.info} **Membercount :** ${guild.memberCount}\n` +
              `${client.emoji.info} **GuildId :** ${guild.id}\n` +
              `${client.emoji.info} **Owner :** ${owner?.user.displayName} \`[${guild.ownerId}]\`\n` +
              `${client.emoji.info} **Adder :** ${adder?.username} \`[${adder?.id}]\`\n`,
          ),
      ],
    });
  };
}

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
