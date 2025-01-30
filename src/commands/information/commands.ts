/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import { Context } from '../../interfaces/context.js';
import { ExtendedClient } from '../../classes/client.js';
import { Command } from '../../classes/abstract/command.js';

export default class Commands extends Command {
  override aliases = ['cmds'];
  description = 'List of all commands';

  execute = async (client: ExtendedClient, ctx: Context) => {
    const allCommands = client.commands.reduce(
      (accumulator, cmd: Command) => {
        if (cmd.category === 'owner') return accumulator;
        accumulator[cmd.category] ||= [];
        accumulator[cmd.category].push({
          name: cmd.name,
        });
        return accumulator;
      },
      {} as Record<string, { name: string }[]>,
    );

    await ctx.reply({
      embeds: [
        client.embed().desc(
          Object.entries(allCommands)
            .sort((b, a) => b[0].length - a[0].length)
            .map(
              ([category, commands]) =>
                `${client.emoji.check} **${
                  category.charAt(0).toUpperCase() + category.slice(1)
                } commands : **\n${commands.map((cmd) => `\`${cmd.name}\``).join(', ')}`,
            )
            .join('\n\n'),
        ),
      ],
    });
  };
}

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
