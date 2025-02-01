/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */
const event = 'buttonClick';
export default class ButtonClick {
    constructor() {
        this.name = event;
        this.execute = async (client, interaction) => {
            if (interaction.customId.includes('playEmbedButton'))
                return void client.emit('playerButtonClick', interaction);
        };
    }
}
/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
