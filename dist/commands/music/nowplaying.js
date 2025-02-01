/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */
import { Command } from '../../classes/abstract/command.js';
export default class NowPlaying extends Command {
    constructor() {
        super(...arguments);
        this.playing = true;
        this.inSameVC = true;
        this.aliases = ['now', 'np'];
        this.description = 'Get current song info';
        this.execute = async (client, ctx) => {
            const track = client.getPlayer(ctx).queue.current;
            await ctx.reply({
                embeds: [
                    client
                        .embed()
                        .desc(`${client.emoji.check} ${track.title}\n\n` +
                        `${client.emoji.info} Duration: ${track.isStream ? `◉ LiVE` : client.formatDuration(track.length)}\n` +
                        `${client.emoji.info} Author: ${track.author}`)
                        .footer({
                        text: `Track requested by ${track.requester.displayName}`,
                    }),
                ],
            });
        };
    }
}
/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
