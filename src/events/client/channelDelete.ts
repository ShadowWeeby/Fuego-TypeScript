/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import { Events } from '../../interfaces/events.js';
import { Event } from '../../classes/abstract/event.js';
import { ExtendedClient } from '../../classes/client.js';
import { DMChannel, NonThreadGuildBasedChannel } from 'discord.js';

const event: keyof Events = 'channelDelete';

export default class ChannelDelete implements Event<typeof event> {
  name = event;

  execute = async (client: ExtendedClient, channel: DMChannel | NonThreadGuildBasedChannel) => {
    if (channel.isDMBased()) return;

    const player = client.getPlayer(channel);
    if (!player || player?.textId !== channel.id) return;

    await player.destroy();
  };
}

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
