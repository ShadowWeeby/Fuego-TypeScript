/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */
import { getRandomPost } from '../../functions/reddit.js';
import { Command } from '../../classes/abstract/command.js';
export default class Porn extends Command {
    constructor() {
        super(...arguments);
        this.slash = false;
        this.description = 'Shows random porn';
    }
    async execute(client, ctx) {
        await ctx.reply({ content: (await getRandomPost(this.name)).image });
    }
}
/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
