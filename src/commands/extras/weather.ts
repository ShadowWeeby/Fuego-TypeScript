/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import { Args } from '../../interfaces/args.js';
import { Context } from '../../interfaces/context.js';
import { getWeather } from '../../functions/weather.js';
import { ExtendedClient } from '../../classes/client.js';
import { Command, options } from '../../classes/abstract/command.js';

export default class Weather extends Command {
  override aliases = ['w'];
  override usage = '<loaction>';
  description = 'Get weather information';

  override options: options[] = [
    {
      required: true,
      name: 'location',
      opType: 'string',
      description: 'use zip/pin code (recommended)',
    },
  ];

  execute = async (client: ExtendedClient, ctx: Context, args: Args) => {
    if (!args[0]) {
      await ctx.reply({
        embeds: [client.embed().desc(`${client.emoji.cross} Please provide a location.`)],
      });
      return;
    }

    const waitEmbed = await ctx.reply({
      embeds: [
        client
          .embed()
          .desc(`${client.emoji.timer} Please wait while I gather weather data from MSN.`),
      ],
    });

    const data = await getWeather(args.join(' '));

    if (!data) {
      await waitEmbed.edit({
        embeds: [
          client
            .embed()
            .desc(`${client.emoji.cross} Fetch failed. Please provide a valid location.`),
        ],
      });
      return;
    }

    await waitEmbed.edit({
      embeds: [
        client
          .embed()
          .setAuthor({
            iconURL: data.img,
            name: data.weather,
          })
          .desc(
            Object.entries(data)
              .map(([key, value]) =>
                !['img', 'weather'].includes(key) ?
                  `${client.emoji.info} **${key.charAt(0).toUpperCase() + key.slice(1)} :** ${value}\n`
                : '',
              )
              .join(''),
          )
          .footer({ text: 'This weather data was provided by MSN' }),
      ],
    });
  };
}

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
