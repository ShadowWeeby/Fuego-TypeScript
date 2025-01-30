/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import { ButtonInteraction } from 'discord.js';
import { Events } from '../../interfaces/events.js';
import { Event } from '../../classes/abstract/event.js';
import { ExtendedClient } from '../../classes/client.js';

const event: keyof Events = 'buttonClick';

export default class ButtonClick implements Event<typeof event> {
  name = event;

  execute = async (client: ExtendedClient, interaction: ButtonInteraction) => {
    if (interaction.customId.includes('playEmbedButton'))
      return void client.emit('playerButtonClick', interaction);
  };
}

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
