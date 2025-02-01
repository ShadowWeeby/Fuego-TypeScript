/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */
import axios from 'axios';
import { Command } from '../../classes/abstract/command.js';
export default class Define extends Command {
    constructor() {
        super(...arguments);
        this.usage = '<query>';
        this.description = 'Get explanation/definition';
        this.options = [
            {
                name: 'string',
                required: true,
                opType: 'string',
                description: 'word to define',
            },
        ];
        this.execute = async (client, ctx, args) => {
            if (!args[0]) {
                await ctx.reply({
                    embeds: [client.embed().desc(`${client.emoji.cross} Please provide a word to define.`)],
                });
                return;
            }
            const waitEmbed = await ctx.reply({
                embeds: [
                    client
                        .embed()
                        .desc(`${client.emoji.timer} Please wait while i gather information about the word \`${args[0]}\`.`),
                ],
            });
            const response = await axios
                .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${args[0]}`)
                .catch(() => null);
            if (!response) {
                await waitEmbed.edit({
                    embeds: [
                        client
                            .embed()
                            .desc(`${client.emoji.cross} Sorry, I could not find any definition for the word \`${args[0]}\`.`),
                    ],
                });
                return;
            }
            const data = response.data[0];
            const word = data.word;
            const phonetics = data.phonetics[0] ? data.phonetics[0].text : 'N/A';
            const meanings = data.meanings
                .map(
            /* eslint-disable @typescript-eslint/no-explicit-any */
            (meaning) => `${client.emoji.check} **${meaning.partOfSpeech} :**\n` +
                /* eslint-disable @typescript-eslint/no-explicit-any */
                `${meaning.definitions.map((def) => `${client.emoji.info} ${def.definition}`).join('\n')}`)
                .join('\n\n');
            await waitEmbed.edit({
                embeds: [
                    client
                        .embed()
                        .desc(`${client.emoji.check} **Word :** ${word}\n` +
                        `${client.emoji.check} **Phonetics :** ${phonetics}\n\n` +
                        `${meanings}`),
                ],
            });
        };
    }
}
/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
