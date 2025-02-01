/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import moment from 'moment';
import { Events } from '../../interfaces/events.js';
import { ActionRowBuilder, User } from 'discord.js';
import { Event } from '../../classes/abstract/event.js';
import { ExtendedClient } from '../../classes/client.js';
import { KazagumoPlayer, KazagumoTrack } from 'kazagumo';
import { ExtendedButtonBuilder } from '../../classes/button.js';
import { generatePlayEmbed } from '../../functions/generatePlayEmbed.js';

const event: keyof Events = 'trackStart';

export default class PlayerStart implements Event<typeof event> {
  name = event;

  async execute(client: ExtendedClient, player: KazagumoPlayer, track: KazagumoTrack) {
    if (!track.title || !player.textId) return;

    player.data.set('autoplayFromTrack', track);

    const channel = client.channels.cache.get(player.textId);

    if (!channel?.isTextBased() || !('send' in channel)) return;
    
    const playEmbed = await channel.send({
      embeds: [generatePlayEmbed(client, player)],
      components: [
        new ActionRowBuilder<ExtendedButtonBuilder>().addComponents([
          client
            .button()
            .secondary(`playEmbedButton_${player.guildId}_prev`, ``, client.emoji.previous),
          client
            .button()
            .secondary(`playEmbedButton_${player.guildId}_pause`, ``, client.emoji.pause),
          client
            .button()
            .secondary(`playEmbedButton_${player.guildId}_next`, ``, client.emoji.next),
          client
            .button()
            .secondary(`playEmbedButton_${player.guildId}_stop`, ``, client.emoji.stop),
          client
            .button()
            ?.[
              player?.data.get('autoplayStatus') ? 'success' : 'secondary'
            ](`playEmbedButton_${player.guildId}_autoplay`, ``, client.emoji.autoplay),
        ]),
      ],
    });

    player.data.set('playEmbed', playEmbed);

    const requesterId = (track.requester as User | undefined)?.id;
    const date = `${moment().tz('Asia/Kolkata').format('DD-MM-YYYY')}`;

    await Promise.all([
      client.db.stats.songsPlayed.set(
        date,
        ((await client.db.stats.songsPlayed.get(date)) ?? 0) + 1,
      ),
      client.db.stats.songsPlayed.set(
        'total',
        ((await client.db.stats.songsPlayed.get('total')) ?? 0) + 1,
      ),
      client.db.stats.songsPlayed.set(
        requesterId!,
        ((await client.db.stats.songsPlayed.get(requesterId!)) ?? 0) + 1,
      ),
      client.db.stats.songsPlayed.set(
        player.guildId,
        ((await client.db.stats.songsPlayed.get(player.guildId)) ?? 0) + 1,
      ),
    ]).catch(() => {});

    await client.webhooks.playerLogs.send({
      username: `Player-logs`,
      avatarURL: `${client.user?.displayAvatarURL()}`,
      embeds: [
        client
          .embed()
          .desc(
            `${client.emoji.info} **[${moment().tz('Asia/Kolkata')}]** Started playing \`${track.title.substring(0, 30)}\` ` +
              `in guild named \`${client.guilds.cache.get(player.guildId)?.name.substring(0, 20)}\` (${player.guildId}). ` +
              `Track requested by \`${(track.requester as User | undefined)?.tag}\`.`,
          ),
      ],
    });
  }
}

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
