/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import { KazagumoPlayer } from 'kazagumo';
import { ExtendedClient } from '../classes/client.js';
import { ActionRowBuilder, Message } from 'discord.js';
import { ExtendedButtonBuilder } from '../classes/button.js';

export const updatePlayerButtons = async (client: ExtendedClient, player: KazagumoPlayer) => {
  const playEmbed = player.data.get('playEmbed') as Message;

  await playEmbed.edit({
    components: [
      new ActionRowBuilder<ExtendedButtonBuilder>().addComponents([
        client
          .button()
          .secondary(`playEmbedButton_${player.guildId}_prev`, ``, client.emoji.previous),
        client
          .button()
          .secondary(
            `playEmbedButton_${player.guildId}_${player.paused ? 'resume' : 'pause'}`,
            ``,
            player.paused ? client.emoji.resume : client.emoji.pause,
          ),
        client.button().secondary(`playEmbedButton_${player.guildId}_next`, ``, client.emoji.next),
        client.button().secondary(`playEmbedButton_${player.guildId}_stop`, ``, client.emoji.stop),
        client
          .button()
          ?.[
            player?.data.get('autoplayStatus') ? 'success' : 'secondary'
          ](`playEmbedButton_${player.guildId}_autoplay`, ``, client.emoji.autoplay),
      ]),
    ],
  });
};

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
