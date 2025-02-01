/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */
const event = 'voiceStateUpdate';
export default class AutoDestroy {
    constructor() {
        this.name = event;
        this.execute = async (client, oldState, newState) => {
            if (newState.member?.voice.channelId)
                return;
            if (newState.member?.id !== client.user?.id)
                return;
            await client.getPlayer(newState)?.destroy();
        };
    }
}
/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
