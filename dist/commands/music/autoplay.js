/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */
import { Command } from '../../classes/abstract/command.js';
import { updatePlayerButtons } from '../../functions/updatePlayerButtons.js';
export default class Autoplay extends Command {
    constructor() {
        super(...arguments);
        this.playing = true;
        this.inSameVC = true;
        this.aliases = ['ap'];
        this.description = 'Toggle autoplay';
        this.execute = async (client, ctx) => {
            const player = client.getPlayer(ctx);
            const currentStatus = player.data.get('autoplayStatus') ? true : false;
            currentStatus ?
                player.data.delete('autoplayStatus')
                : player.data.set('autoplayStatus', true);
            await updatePlayerButtons(client, player);
            await ctx.reply({
                embeds: [
                    client
                        .embed()
                        .desc(`${client.emoji.check} Set autoplay mode to \`${!currentStatus ? `enabled` : `disabled`}\`.`),
                ],
            });
        };
    }
}
/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
