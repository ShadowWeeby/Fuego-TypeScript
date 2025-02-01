/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */
const event = 'infoRequested';
export default class InfoRequested {
    constructor() {
        this.name = event;
        this.execute = async (client, ctx, command) => {
            await ctx.reply({
                embeds: [
                    client
                        .embed()
                        .desc(`${client.emoji.check} **Command info :**\n\n` +
                        `${client.emoji.info} **Name :** ${command.name}\n` +
                        `${client.emoji.info} **Aliases :** ${`${command.aliases.join(', ')}` || 'No aliases found'}\n` +
                        `${client.emoji.info} **Usage :** ${client.prefix}${command.name} ${command.usage}\n` +
                        `${client.emoji.info} **Desc :** ${command.description}\n`),
                ],
            });
        };
    }
}
/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
