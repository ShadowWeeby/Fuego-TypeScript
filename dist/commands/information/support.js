/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */
import { ActionRowBuilder } from 'discord.js';
import { Command } from '../../classes/abstract/command.js';
export default class Support extends Command {
    constructor() {
        super(...arguments);
        this.description = 'Shows support sv link';
        this.execute = async (client, ctx) => {
            await ctx.reply({
                embeds: [
                    client
                        .embed()
                        .desc(`${client.emoji.check} Need human assistance / any issue?\n` +
                        `${client.emoji.info} Join my support by clicking below.`),
                ],
                components: [
                    new ActionRowBuilder().addComponents([
                        client.button().link('⠀⠀⠀⠀⠀⠀Support Server⠀⠀⠀⠀⠀⠀⠀', client.config.links.support),
                    ]),
                ],
            });
        };
    }
}
/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
