/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import { Context } from '../../interfaces/context.js';
import { ActionRowBuilder } from '@discordjs/builders';
import { ExtendedClient } from '../../classes/client.js';
import { Command } from '../../classes/abstract/command.js';
import { ExtendedButtonBuilder } from '../../classes/button.js';

export default class Grab extends Command {
  override playing = true;
  override inSameVC = true;
  override description = 'DM current song info';

  override execute = async (client: ExtendedClient, ctx: Context) => {
    const track = client.getPlayer(ctx)!.queue.current;

    await ctx.author
      .send({
        embeds: [
          client
            .embed()
            .desc(
              `${client.emoji.check} **${track!.title}**\n\n` +
                `ㅤ${client.emoji.info} Duration: ${client.formatDuration(track!.length!)}\n` +
                `ㅤ${client.emoji.info} Author: ${track?.author?.substring(0, 12)}\n`,
            ),
        ],
        components: [
          new ActionRowBuilder<ExtendedButtonBuilder>().addComponents([
            client
              .button()
              .link(`Link to song ( External source - ${track!.sourceName} )`, track!.uri!),
          ]),
        ],
      })
      .then(
        async () =>
          await ctx.react(client.emoji.check, {
            embeds: [
              client.embed().desc(`${client.emoji.check} Sent current song info to your DM.`),
            ],
          }),
      )
      .catch(
        async () =>
          await ctx.react(client.emoji.cross, {
            embeds: [
              client
                .embed()
                .desc(`${client.emoji.cross} Could not send current song info to your DM.`),
            ],
          }),
      );
  };
}

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
