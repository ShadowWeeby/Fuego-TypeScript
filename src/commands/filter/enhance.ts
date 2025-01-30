/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import { Context } from '../../interfaces/context.js';
import { ExtendedClient } from '../../classes/client.js';
import { Command } from '../../classes/abstract/command.js';

export default class Enhance extends Command {
  override playing = true;
  override inSameVC = true;
  override description = 'Enhances audio quality';

  override execute = async (client: ExtendedClient, ctx: Context) => {
    const waitEmbed = await ctx.reply({
      embeds: [
        client
          .embed()
          .desc(
            `${client.emoji.timer} Please wait while I adjust ` +
              `VC & Player parameters for a richer and fuller sound.`,
          ),
      ],
    });

    let bitrate = 96000;
    const rtcRegion = 'brazil';

    switch (ctx.guild.premiumTier) {
      case 1:
        bitrate = 128000;
        break;
      case 2:
        bitrate = 256000;
        break;
      case 3:
        bitrate = 384000;
        break;
    }

    await Promise.all([
      client.getPlayer(ctx)!.shoukaku.setFilters({
        equalizer: [
          { band: 0, gain: 0.025 },
          { band: 1, gain: 0.03 },
          { band: 2, gain: 0.06 },
          { band: 3, gain: 0.01 },
          { band: 4, gain: 0.0625 },
          { band: 5, gain: 0.0125 },
          { band: 6, gain: -0.025 },
          { band: 7, gain: -0.05 },
          { band: 8, gain: -0.025 },
          { band: 9, gain: 0.01 },
          { band: 10, gain: 0.005 },
          { band: 11, gain: 0.0325 },
          { band: 12, gain: 0.05 },
          { band: 13, gain: 0.07 },
          { band: 14, gain: 0.04 },
        ],
      }),

      client.getPlayer(ctx)!.setVolume(80),

      ctx.member.voice.channel!.edit({
        bitrate,
        rtcRegion,
      }),

      client.sleep(3),
    ]);

    await waitEmbed.edit({
      embeds: [
        client
          .embed()
          .desc(
            `${client.emoji.check} Enjoy your enhanced audio.\n\n` +
              `${client.emoji.info} Set voice channel region to \`${rtcRegion}\`.\n` +
              `${client.emoji.info} \`Harman 2019\`'s the audio signature.\n` +
              `${client.emoji.info} Set voice channel bitrate to \`${bitrate / 1000}kbps\`.\n`,
          ),
      ],
    });
  };
}

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
