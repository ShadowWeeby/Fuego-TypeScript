/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */
import { getRandomPost } from '../../functions/reddit.js';
import { Command } from '../../classes/abstract/command.js';
export default class Facts extends Command {
    constructor() {
        super(...arguments);
        this.aliases = ['fact'];
        this.description = 'Shows a random quote';
    }
    async execute(client, ctx) {
        await ctx.reply({
            embeds: [
                client.embed().desc(`${client.emoji.info} ${(await getRandomPost(this.name)).title}`),
            ],
        });
    }
}
/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
