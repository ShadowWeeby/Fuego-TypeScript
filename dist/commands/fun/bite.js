/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */
import { Command } from '../../classes/abstract/command.js';
import { randomNekoImage } from '../../functions/randomNekoImage.js';
export default class Bite extends Command {
    constructor() {
        super(...arguments);
        this.slash = false;
        this.usage = '[member]';
        this.description = 'Bite someone';
    }
    async execute(client, ctx) {
        await ctx.reply({
            embeds: [
                client
                    .embed()
                    .desc(`${ctx.author} bit ${ctx.mentions.users?.first() || `some random weirdo`}`)
                    .img(await randomNekoImage(this.name)),
            ],
        });
    }
}
/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
