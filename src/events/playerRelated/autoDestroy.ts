/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import { VoiceState } from 'discord.js';
import { Events } from '../../interfaces/events.js';
import { Event } from '../../classes/abstract/event.js';
import { ExtendedClient } from '../../classes/client.js';

const event: keyof Events = 'voiceStateUpdate';

export default class AutoDestroy implements Event<typeof event> {
  name = event;

  execute = async (client: ExtendedClient, oldState: VoiceState, newState: VoiceState) => {
    if (newState.member?.voice.channelId) return;
    if (newState.member?.id !== client.user?.id) return;
    await client.getPlayer(newState)?.destroy();
  };
}

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
