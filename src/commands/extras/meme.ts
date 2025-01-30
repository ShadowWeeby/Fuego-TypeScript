/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import { Context } from '../../interfaces/context.js';
import { ExtendedClient } from '../../classes/client.js';
import { getRandomPost } from '../../functions/reddit.js';
import { Command } from '../../classes/abstract/command.js';

export default class Meme extends Command {
  description = 'Shows random meme';

  async execute(client: ExtendedClient, ctx: Context) {
    const data = await getRandomPost(this.name);
    await ctx.reply({ embeds: [client.embed().desc(data.title).img(data.image)] });
  }
}

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
