/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */
import { limited } from '../../utils/ratelimiter.js';
const event = 'mention';
export default class Mention {
    constructor() {
        this.name = event;
        this.execute = async (client, ctx) => {
            if (limited(ctx.author.id))
                return void client.emit('blUser', ctx);
            await ctx.reply({
                embeds: [
                    client
                        .embed()
                        .desc(`Hey ${ctx.author}, my global prefix is \`${client.prefix}\`.\n\n` +
                        'What would you like to listen/do today ? \n' +
                        `Use \`${client.prefix}help\` or \`/help\` to start your journey.`),
                ],
            });
        };
    }
}
/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
