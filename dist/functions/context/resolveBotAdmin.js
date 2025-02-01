/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */
export const resolveBotAdmin = async (ctx, command) => {
    const { client } = ctx;
    const owner = client.owners.includes(ctx.author.id);
    const admin = client.admins.includes(ctx.author.id);
    if (command.admin && !(owner || admin)) {
        await ctx.reply({
            embeds: [
                client
                    .embed()
                    .desc(`${client.emoji.cross} Only my Owner/s and Admin/s can use this command.`),
            ],
        });
        return false;
    }
    if (command.owner && !owner) {
        await ctx.reply({
            embeds: [client.embed().desc(`${client.emoji.cross} Only my Owner/s can use this command.`)],
        });
        return false;
    }
    return true;
};
/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
