/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import { Context } from '../../interfaces/context.js';

export const resolvePrefix = async (ctx: Context, noPrefix: boolean) => {
  return (
    ctx.content.startsWith(ctx.client.prefix) ? ctx.client.prefix
    : ctx.content.startsWith(`<@${ctx.client.user!.id}>`) ? `${ctx.client.user}`
    : noPrefix ? ''
    : null
  );
};

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
