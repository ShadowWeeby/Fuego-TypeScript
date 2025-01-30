/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import { Events } from '../../interfaces/events.js';
import { Context } from '../../interfaces/context.js';
import { Event } from '../../classes/abstract/event.js';
import { ExtendedClient } from '../../classes/client.js';
import { execute } from '../../functions/context/execute.js';
import { resolveNsfw } from '../../functions/context/resolveNsfw.js';
import { resolvePerms } from '../../functions/context/resolvePerms.js';
import { enforceAdmin } from '../../functions/context/enforceAdmin.js';
import { resolveVoice } from '../../functions/context/resolveVoice.js';
import { resolvePlayer } from '../../functions/context/resolvePlayer.js';
import { isUnderCooldown } from '../../functions/context/checkCooldown.js';
import { resolvePrefix } from '../../functions/context/resolvePrefix.js';
import { resolveCommand } from '../../functions/context/resolveCommand.js';
import { resolveBotAdmin } from '../../functions/context/resolveBotAdmin.js';

const event: keyof Events = 'ctxCreate';

export default class ContextCreate implements Event<typeof event> {
  name = event;

  execute = async (client: ExtendedClient, ctx: Context) => {
    if (!ctx) return;

    const [owner, admin, noPrefix, bl] = await Promise.all([
      client.owners.includes(ctx.author.id),
      client.admins.includes(ctx.author.id),
      client.db.noPrefix.get(ctx.author.id),
      client.db.blacklist.get(ctx.author.id),
    ]);

    const botAdmin = owner || admin ? true : false;
    const np = botAdmin || noPrefix ? true : false;

    if (bl) return;

    if (!(await resolvePerms.basic(ctx))) return;

    if (ctx.content.match(new RegExp(`^<@!?${client.user!.id}>( |)$`)))
      return void client.emit('mention', ctx);

    const resolvedPrefix = await resolvePrefix(ctx, np);

    if (resolvedPrefix === null) return;

    const { command, args } = await resolveCommand(ctx, resolvedPrefix);

    if (!command) return;

    if (!botAdmin && (await isUnderCooldown(ctx, command))) return;

    if (!(await enforceAdmin(ctx))) return;

    if (!(await resolvePerms.user(ctx, command, botAdmin))) return;

    if (!(await resolveBotAdmin(ctx, command))) return;

    if (client.underMaintenance && !botAdmin) return void client.emit('underMaintenance', ctx);

    if (args[0]?.toLowerCase() === '-h') return void client.emit('infoRequested', ctx, command);

    if (!(await resolveVoice(ctx, command))) return;

    if (!(await resolvePlayer(ctx, command))) return;

    if (!(await resolveNsfw(ctx, command))) return;

    await execute(ctx, command, args);
  };
}

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
