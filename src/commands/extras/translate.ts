/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import {
  Message,
  ActionRowBuilder,
  CollectedInteraction,
  StringSelectMenuBuilder,
  StringSelectMenuInteraction,
} from 'discord.js';
import { filter } from '../../utils/filter.js';
import { Args } from '../../interfaces/args.js';
import translate from '@iamtraction/google-translate';
import { Context } from '../../interfaces/context.js';
import { ExtendedClient } from '../../classes/client.js';
import { Command, options } from '../../classes/abstract/command.js';

export default class Translate extends Command {
  override aliases = ['tr'];
  description = 'Translate stuff';
  override usage = '<reference/query>';

  override options: options[] = [
    {
      name: 'string',
      required: true,
      opType: 'string',
      description: 'text to translate',
    },
  ];

  execute = async (client: ExtendedClient, ctx: Context, args: Args) => {
    const getResult = async (query: string, targetLanguage: string, messageToUpdate: Message) => {
      const result = await translate(query, { to: targetLanguage })
        .then(
          (translatedResult) =>
            `${client.emoji.info} Translated result (${targetLanguage.charAt(0).toUpperCase() + targetLanguage.slice(1)}) : \n\n` +
            `${translatedResult.text}`,
        )
        .catch(() => `${client.emoji.warn} Translation failed ! Please try again.`);

      return await messageToUpdate.edit({
        embeds: [
          client
            .embed()
            .desc(result)
            .footer({ text: 'Translation provided by @iamtraction/goolge-translate' }),
        ],
        components: [selectMenu],
      });
    };

    const query =
      args.length ?
        args.join(' ')
      : await ctx.message
          ?.fetchReference()
          .then((message) => message.embeds?.[0]?.description || message.content)
          .catch(() => undefined);

    if (!query) {
      await ctx.reply({
        embeds: [client.embed().desc(`${client.emoji.cross} Please provide a query to translate.`)],
      });
      return;
    }

    const waitEmbed = await ctx.reply({
      embeds: [
        client.embed().desc(`${client.emoji.timer} Please wait while I translate the given query.`),
      ],
    });

    const menu = new StringSelectMenuBuilder()
      .setMaxValues(1)
      .setCustomId('menu')
      .setPlaceholder('Select language to translate to.');

    const selectMenu = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(menu);

    [
      { value: 'ar', label: 'Arabic' },
      { value: 'bn', label: 'Bengali' },
      { value: 'en', label: 'English' },
      { value: 'gu', label: 'Gujarati' },
      { value: 'hi', label: 'Hindi' },
      { value: 'ja', label: 'Japanese' },
      { value: 'ne', label: 'Nepali' },
      { value: 'ru', label: 'Russian' },
      { value: 'ta', label: 'Tamil' },
      { value: 'te', label: 'Telugu' },
      { value: 'ur', label: 'Urdu' },
    ].forEach(({ value, label }) => {
      menu.addOptions({
        label,
        value,
      });
    });

    const reply = await getResult(query, 'en', waitEmbed);

    const collector = reply.createMessageComponentCollector({
      idle: 30000,
      filter: async (interaction: CollectedInteraction) => await filter(interaction, ctx),
    });

    collector.on('collect', async (interaction: StringSelectMenuInteraction) => {
      await interaction.deferUpdate();

      await interaction.message.edit({
        embeds: [
          client
            .embed()
            .desc(`${client.emoji.timer} Please wait while I translate the given query.`),
        ],
      });

      await getResult(query, interaction.values[0], interaction.message);
    });

    collector.on('end', async () => {
      await reply.edit({ components: [] });
    });
  };
}

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
