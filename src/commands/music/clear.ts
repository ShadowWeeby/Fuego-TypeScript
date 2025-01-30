/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import { Args } from '../../interfaces/args.js';
import { Context } from '../../interfaces/context.js';
import { ExtendedClient } from '../../classes/client.js';
import { Command, options } from '../../classes/abstract/command.js';

export default class Clear extends Command {
  override playing = true;
  override inSameVC = true;
  override usage = '<f/q/filter/queue>';
  override description = 'Clear queue/filters';

  override options: options[] = [
    {
      name: 'op',
      required: true,
      opType: 'string',
      choices: [
        { name: 'queue', value: 'q' },
        { name: 'filters', value: 'f' },
      ],
      description: 'option to clear (queue or filters)',
    },
  ];

  override execute = async (client: ExtendedClient, ctx: Context, args: Args) => {
    const player = client.getPlayer(ctx);

    switch (args[0]?.toLowerCase()) {
      case 'q':
      case 'queue':
        player!.queue.clear();
        await ctx.reply({
          embeds: [client.embed().desc(`${client.emoji.check} Queue cleared successfully.`)],
        });
        break;

      case 'f':
      case 'filters':
        await ctx
          .reply({
            embeds: [
              client
                .embed()
                .desc(`${client.emoji.check} Please wait while I clear all applied filters.`),
            ],
          })
          .then(async (reply) => {
            await player!.shoukaku.clearFilters();
            await client.sleep(3);
            await reply.edit({
              embeds: [client.embed().desc(`${client.emoji.check} Filters cleared successfully.`)],
            });
          });
        break;

      default:
        await ctx.reply({
          embeds: [
            client
              .embed()
              .desc(
                `${client.emoji.cross} Please provide a valid option \`q\` or \`f\` or \`queue\` or \`filters\`.`,
              ),
          ],
        });
        break;
    }
  };
}

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
