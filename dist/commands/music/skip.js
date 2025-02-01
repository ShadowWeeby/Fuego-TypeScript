/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */
import { Command } from '../../classes/abstract/command.js';
export default class Skip extends Command {
    constructor() {
        super(...arguments);
        this.playing = true;
        this.inSameVC = true;
        this.aliases = ['next'];
        this.description = 'Plays next song';
        this.execute = async (client, ctx) => {
            const player = client.getPlayer(ctx);
            if (player.queue.length == 0 && !player.data.get('autoplayStatus')) {
                await ctx.reply({
                    embeds: [
                        client.embed().desc(`${client.emoji.cross} No more songs left in the queue to skip.`),
                    ],
                });
                return;
            }
            const skipTrack = player.queue.current;
            await player.shoukaku.stopTrack();
            await ctx.reply({
                embeds: [client.embed().desc(`${client.emoji.check} Skipped ${skipTrack.title}.`)],
            });
        };
    }
}
/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
