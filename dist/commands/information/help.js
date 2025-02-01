/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */
import { ActionRowBuilder, StringSelectMenuBuilder, } from 'discord.js';
import { filter } from '../../utils/filter.js';
import { Command } from '../../classes/abstract/command.js';
export default class Help extends Command {
    constructor() {
        super(...arguments);
        this.aliases = ['h'];
        this.description = 'Shows this menu';
        this.execute = async (client, ctx) => {
            const allCommands = client.commands.reduce((acc, cmd) => {
                if (cmd.category === 'owner')
                    return acc;
                acc[cmd.category] ||= [];
                acc[cmd.category].push({
                    name: cmd.name,
                    description: `${cmd.description?.length > 25 ?
                        cmd.description?.substring(0, 22) + '...'
                        : cmd.description}`,
                });
                return acc;
            }, {});
            const categories = client.categories
                .sort((b, a) => b.length - a.length)
                .filter((category) => category !== 'owner');
            const embed = client
                .embed()
                .desc(`${client.emoji.info} \`${`My global prefix is ${client.prefix} ( Changable ).`.padEnd(48, ' ')}\`\n` +
                `${client.emoji.info} \`${'Made and maintained by 1sT-Services.'.padEnd(48, ' ')}\`\n` +
                `${client.emoji.info} \`${'Select an option below to view cmds.'.padEnd(48, ' ')}\`\n`)
                .img('https://media.discordapp.net/attachments/1210593301552697396/1250715186185240596/fuego.png?ex=666bf2c9&is=666aa149&hm=a6c526a2e27255998582225feca01e0cfa840d91375d24bfe1d43e55bd2b81c2&=&format=webp&quality=lossless')
                .footer({
                text: 'By ━● 1sT-Services | Use (cmd -h) for command info',
            });
            const menu = new StringSelectMenuBuilder()
                .setMaxValues(1)
                .setCustomId('menu')
                .addOptions([
                {
                    value: 'home',
                    emoji: client.emoji.info,
                    label: 'Go back to homepage',
                },
            ])
                .setPlaceholder('Select category to view commands');
            categories.forEach((category) => {
                menu.addOptions({
                    value: category,
                    emoji: client.emoji.info,
                    label: category.charAt(0).toUpperCase() + category.slice(1) + ' commands',
                });
            });
            menu.addOptions([
                {
                    value: 'all',
                    emoji: client.emoji.info,
                    label: 'Show all commands',
                },
            ]);
            const reply = await ctx.reply({
                embeds: [embed],
                components: [new ActionRowBuilder().addComponents(menu)],
            });
            const collector = reply.createMessageComponentCollector({
                idle: 30000,
                filter: async (interaction) => await filter(interaction, ctx),
            });
            collector.on('collect', async (interaction) => {
                await interaction.deferUpdate();
                const category = interaction.values[0];
                switch (category) {
                    case 'home':
                        await reply.edit({
                            embeds: [embed],
                        });
                        break;
                    case 'all':
                        await reply.edit({
                            embeds: [
                                client.embed().desc(Object.entries(allCommands)
                                    .sort((b, a) => b[0].length - a[0].length)
                                    .map(([category, commands]) => `${client.emoji.check} **${category.charAt(0).toUpperCase() + category.slice(1)} commands**\n${commands.map((cmd) => `\`${cmd.name}\``).join(', ')}`)
                                    .join('\n\n')),
                            ],
                        });
                        break;
                    default:
                        await reply.edit({
                            embeds: [
                                client
                                    .embed()
                                    .title(`${client.emoji.check} ${category.charAt(0).toUpperCase() + category.slice(1)} commands`)
                                    .desc(allCommands[category]
                                    ?.map((cmd) => `${client.emoji.info} **\`${cmd.name.padEnd(11, ' ')} - \`**\`${cmd.description.padEnd(33, ' ')}\``)
                                    .join('\n') ||
                                    `${client.emoji.warn} **\`${'No Commands Available'.padEnd(44, ' ')}\`**`),
                            ],
                        });
                        break;
                }
            });
            collector.on('end', async () => {
                await reply.edit({ components: [] });
            });
        };
    }
}
/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
