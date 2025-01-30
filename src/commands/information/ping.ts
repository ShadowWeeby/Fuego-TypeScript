/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import { Context } from '../../interfaces/context.js';
import { ExtendedClient } from '../../classes/client.js';
import { Command } from '../../classes/abstract/command.js';

export default class Ping extends Command {
  override aliases = ['latency', 'pong'];
  description = 'Shows latency stats';

  execute = async (client: ExtendedClient, ctx: Context) => {
    const waitEmbed = await ctx.reply({
      embeds: [
        client.embed().desc(`${client.emoji.timer} Please wait while I fetch latency stats.`),
      ],
    });

    const dbWriteStart = performance.now();
    await client.db.blacklist.set('test', true);
    const dbWriteEnded = performance.now();

    const dbReadStart = performance.now();
    await client.db.blacklist.get('test');
    const dbReadEnded = performance.now();

    const dbDeleteStart = performance.now();
    await client.db.blacklist.delete('test');
    const dbDeleteEnded = performance.now();

    const dbRead = dbReadEnded - dbReadStart;
    const dbWrite = dbWriteEnded - dbWriteStart;
    const dbDelete = dbDeleteEnded - dbDeleteStart;

    const msgLatency = waitEmbed.createdTimestamp - ctx.createdTimestamp;

    await waitEmbed.edit({
      embeds: [
        client
          .embed()
          .desc(
            `${client.emoji.check} **Latency stats**\n\n` +
              `${client.emoji.info} **Websocket latency : ** ${client.ws.ping.toFixed(2)} ms\n` +
              `${client.emoji.info} **DB (write) latency : ** ${dbWrite.toFixed(2)} ms\n` +
              `${client.emoji.info} **DB (read) latency : ** ${dbRead.toFixed(2)} ms\n` +
              `${client.emoji.info} **DB (delete) latency : ** ${dbDelete.toFixed(2)} ms\n` +
              `${client.emoji.info} **Ctx processing latency : ** ${msgLatency.toFixed(2)} ms`,
          ),
      ],
    });
  };
}

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
