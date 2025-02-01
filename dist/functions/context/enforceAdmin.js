/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */
export const enforceAdmin = async (ctx) => {
    const { client } = ctx;
    if (ctx.channel.permissionsFor(ctx.guild.members.me).has('Administrator'))
        return true;
    await ctx.reply({
        embeds: [
            client
                .embed()
                .desc(`${client.emoji.cross} I am really sorry but I can't do anything without ` +
                `\`Administrator\` permission.\n\n` +
                `${client.emoji.info} My owner was too lazy and brainfucked to go through the pain of ` +
                `setting and checking permissions for each command that the bot needs in order to ` +
                `execute that command. So now that's how it is . . . `),
        ],
    });
    return false;
};
/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
