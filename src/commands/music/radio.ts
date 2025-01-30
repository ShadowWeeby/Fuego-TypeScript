/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import {
  ActionRowBuilder,
  CollectedInteraction,
  StringSelectMenuBuilder,
  StringSelectMenuInteraction,
} from 'discord.js';
import { filter } from '../../utils/filter.js';
import { Context } from '../../interfaces/context.js';
import { ExtendedClient } from '../../classes/client.js';
import { Command } from '../../classes/abstract/command.js';

const rad = {
  rap: `https://www.youtube.com/watch?v=1y2R_i2OeFw&pp=ygUMYmFzcyBzYW11cmFp`,
  lofi: `https://www.youtube.com/watch?v=jfKfPfyJRdk&pp=ygUKbG9maSByYWRpbw%3D%3D`,
};

export default class Radio extends Command {
  override inSameVC = true;
  override aliases = ['rad'];
  override description = 'Listen to radio';

  override execute = async (client: ExtendedClient, ctx: Context) => {
    const player =
      client.getPlayer(ctx) ||
      (await client.manager.createPlayer({
        deaf: true,
        guildId: ctx.guild.id,
        textId: ctx.channel.id,
        shardId: ctx.guild.shardId,
        voiceId: ctx.member.voice.channel!.id,
      }));

    const options = Object.entries(rad).map(([label, value], index) => ({
      value,
      emoji: client.emoji.info,
      label: `${index} -  ${label.charAt(0).toUpperCase() + label.substring(1)}`,
    }));

    const menu = new StringSelectMenuBuilder()
      .setMinValues(1)
      .setMaxValues(1)
      .addOptions(options)
      .setCustomId('menu')
      .setPlaceholder('Radio genres / stations');

    const reply = await ctx.reply({
      embeds: [client.embed().desc(`${client.emoji.info} Select a radio genre below.`)],
      components: [new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(menu)],
    });

    const collector = reply.createMessageComponentCollector({
      idle: 30000,
      filter: async (interaction: CollectedInteraction) => await filter(interaction, ctx),
    });

    collector.on('collect', async (interaction: StringSelectMenuInteraction) => {
      await interaction.deferUpdate();

      const tracks = await player
        .search(interaction.values[0], {
          requester: ctx.author,
        })
        .then((res) => res.tracks);

      if (!tracks[0]) {
        await reply.edit({
          embeds: [client.embed().desc(`${client.emoji.cross} Radio N/A at the moment.`)],
        });
        return;
      }

      await player.play(tracks[0]);
      await reply.delete();
    });

    collector.on('end', async (collected) => {
      if (collected.size == 0)
        await reply.edit({
          embeds: [client.embed().desc(`${client.emoji.warn} Radio selection menu timed out !`)],
          components: [],
        });
    });
  };
}

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
