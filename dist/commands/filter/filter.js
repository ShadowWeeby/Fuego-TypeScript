/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */
import { ActionRowBuilder, StringSelectMenuBuilder, } from 'discord.js';
import { filter } from '../../utils/filter.js';
import { filters } from '../../assets/filters.js';
import { Command } from '../../classes/abstract/command.js';
export default class Filter extends Command {
    constructor() {
        super(...arguments);
        this.playing = true;
        this.inSameVC = true;
        this.aliases = ['f'];
        this.description = 'Choose a filter to apply';
        this.execute = async (client, ctx) => {
            const player = client.getPlayer(ctx);
            const menu = new StringSelectMenuBuilder()
                .setMaxValues(1)
                .setCustomId('menu')
                .setPlaceholder('Choose a filter here.');
            Object.keys(filters).forEach((filter) => menu.addOptions({
                value: filter,
                emoji: client.emoji.info,
                label: filter.charAt(0).toUpperCase() + filter.slice(1),
            }));
            const reply = await ctx.reply({
                components: [new ActionRowBuilder().addComponents(menu)],
            });
            const collector = reply.createMessageComponentCollector({
                idle: 30000,
                filter: async (interaction) => await filter(interaction, ctx),
            });
            collector.on('collect', async (interaction) => {
                collector.stop();
                await interaction.deferUpdate();
                const filter = interaction.values[0];
                await reply.edit({
                    embeds: [
                        client
                            .embed()
                            .desc(`${client.emoji.timer} Please wait while I apply the filter \`${filter}\`.`),
                    ],
                    components: [],
                });
                await player.shoukaku.setFilters(filters[filter]);
                await client.sleep(3);
                await reply.edit({
                    embeds: [
                        client
                            .embed()
                            .desc(`${client.emoji.check} Filter \`${filter}\` has been applied successfully.`),
                    ],
                });
            });
            collector.on('end', async (collected) => {
                if (collected.size)
                    return;
                await reply.edit({
                    embeds: [client.embed().desc(`${client.emoji.warn} Filter selection menu timed out!`)],
                    components: [],
                });
            });
        };
    }
}
/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
