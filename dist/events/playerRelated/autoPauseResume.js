/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */
import { updatePlayerButtons } from '../../functions/updatePlayerButtons.js';
const event = 'voiceStateUpdate';
export default class AutoPauseResume {
    constructor() {
        this.name = event;
        this.execute = async (client, oldState, newState) => {
            const player = client.getPlayer(newState);
            if (!(player && player.queue.current))
                return;
            if (player.voiceId !== newState.channel?.id)
                return;
            if (newState.member?.id !== client.user?.id)
                return;
            if (oldState.serverMute === newState.serverMute)
                return;
            const alert = async (description) => {
                await updatePlayerButtons(client, player);
                const channel = newState.guild.channels.cache.get(player.textId);
                if (channel?.isTextBased())
                    await channel
                        .send({
                        embeds: [client.embed().desc(description)],
                    })
                        .then(async (message) => {
                        await client.sleep(5);
                        await message.delete();
                    });
            };
            if (oldState.serverMute && !newState.serverMute) {
                player.pause(false);
                await alert(`${client.emoji.info} Resuming player as unmuted.`);
                return;
            }
            if (!oldState.serverMute && newState.serverMute) {
                player.pause(true);
                await alert(`${client.emoji.info} Player paused as server muted.`);
                return;
            }
        };
    }
}
/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
