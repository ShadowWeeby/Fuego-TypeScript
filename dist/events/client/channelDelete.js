/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */
const event = 'channelDelete';
export default class ChannelDelete {
    constructor() {
        this.name = event;
        this.execute = async (client, channel) => {
            if (channel.isDMBased())
                return;
            const player = client.getPlayer(channel);
            if (!player || player?.textId !== channel.id)
                return;
            await player.destroy();
        };
    }
}
/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
