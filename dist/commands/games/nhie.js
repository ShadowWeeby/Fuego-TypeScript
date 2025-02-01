/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */
import axios from 'axios';
import { Command } from '../../classes/abstract/command.js';
export default class NeverHaveIEver extends Command {
    constructor() {
        super(...arguments);
        this.description = 'Random nhie question';
    }
    async execute(client, ctx) {
        await ctx.reply({
            embeds: [
                client
                    .embed()
                    .desc(`${client.emoji.info} ${await axios
                    .get('https://api.truthordarebot.xyz/v1/nhie')
                    .then((response) => response.data.question)}`),
            ],
        });
    }
}
/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
