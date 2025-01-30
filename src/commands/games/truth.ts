/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import axios from 'axios';
import { Context } from '../../interfaces/context.js';
import { ExtendedClient } from '../../classes/client.js';
import { Command } from '../../classes/abstract/command.js';

export default class Truth extends Command {
  description = 'Random truth question';

  async execute(client: ExtendedClient, ctx: Context) {
    await ctx.reply({
      embeds: [
        client
          .embed()
          .desc(
            `${client.emoji.info} ${await axios
              .get('https://api.truthordarebot.xyz/v1/truth')
              .then((response) => response.data.question)}`,
          ),
      ],
    });
  }
}

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
