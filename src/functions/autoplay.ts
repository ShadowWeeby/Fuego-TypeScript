/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import { TextBasedChannel } from 'discord.js';
import { ExtendedClient } from '../classes/client.js';
import { KazagumoPlayer, KazagumoTrack } from 'kazagumo';

export const autoplay = async (client: ExtendedClient, player: KazagumoPlayer) => {
  await player.data
    .get('playEmbed')
    ?.delete()
    .catch(() => null);

  const currentTrack = player.data.get('autoplayFromTrack') as KazagumoTrack;

  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  const identifier = currentTrack.realUri?.match(regex)?.[1];

  const query =
    identifier ?
      `https://www.youtube.com/watch?v=${identifier}&list=RD${identifier}`
    : currentTrack.author!;

  const result = await player.search(query, {
    requester: client.user,
  });
  
  const channel = client.channels.cache.get(player.textId as string);
  
  if (!channel || !channel.isTextBased() || !('send' in channel)) {
    await player.destroy();
    return;
  }

  if (!result.tracks.length) {
    await channel.send({
      embeds: [
        client
          .embed()
          .desc(
            `${client.emoji.warn} Autoplay ended.\n` +
              `${client.emoji.info} No similar tracks were found.`,
          ),
      ],
    });
    await player.destroy();
    return;
  }

  const track =
    result.tracks[Math.floor(Math.random() * (Math.min(result.tracks.length - 1, 5) + 1) + 1)];

  player?.queue.add(track);
  await player?.play();
};

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
