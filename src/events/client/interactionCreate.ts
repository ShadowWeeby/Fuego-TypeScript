/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import { Interaction } from 'discord.js';
import { Events } from '../../interfaces/events.js';
import { Event } from '../../classes/abstract/event.js';
import { ExtendedClient } from '../../classes/client.js';
import { createContext } from '../../functions/contextFrom/interaction.js';

const event: keyof Events = 'interactionCreate';

export default class InteractionCreate implements Event<typeof event> {
  name = event;

  execute = async (client: ExtendedClient, interaction: Interaction) => {
    if (interaction.user.bot) return;

    if (interaction.isButton()) return void client.emit('buttonClick', interaction);

    if (interaction.isCommand()) {
      await interaction.deferReply();
      return void client.emit('ctxCreate', await createContext(client, interaction));
    }

    if (interaction.isAutocomplete()) {
      if (['play', 'search'].includes(interaction.commandName)) {
        const query = interaction.options.getString('query');

        if (!query) return;

        const res = await client.manager.search(query, {
          engine: 'youtube',
          requester: interaction.user,
        });

        const { tracks } = res;
        const songs: { name: string; value: string }[] = [];

        if (!tracks.length) return;

        tracks.slice(0, 10).forEach((track) => {
          songs.push({
            name: track.title,
            value: track.uri!,
          });
        });

        await interaction.respond(songs).catch(() => {});
      }
    }
  };
}

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
