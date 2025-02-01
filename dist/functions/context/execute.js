/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */
import moment from 'moment';
export const execute = async (ctx, command, args) => {
    const { client } = ctx;
    command.execute(client, ctx, args);
    const date = `${moment().tz('Asia/Kolkata').format('DD-MM-YYYY')}`;
    await Promise.all([
        client.db.stats.commandsUsed.set(date, ((await client.db.stats.commandsUsed.get(date)) ?? 0) + 1),
        client.db.stats.commandsUsed.set('total', ((await client.db.stats.commandsUsed.get('total')) ?? 0) + 1),
        client.db.stats.commandsUsed.set(ctx.guild.id, ((await client.db.stats.commandsUsed.get(ctx.guild.id)) ?? 0) + 1),
        client.db.stats.commandsUsed.set(ctx.author.id, ((await client.db.stats.commandsUsed.get(ctx.author.id)) ?? 0) + 1),
    ]).catch(() => { });
    await client.webhooks.cmdLogs.send({
        username: `Command-logs`,
        avatarURL: `${client.user?.displayAvatarURL()}`,
        embeds: [
            client
                .embed()
                .desc(`${client.emoji.info} **Command \`${command.name}\` used (${moment().tz('Asia/Kolkata')})**\n\n` +
                `${client.emoji.info} **Content :** ${ctx.content}\n` +
                `${client.emoji.info} **User :** ${ctx.author.tag} \`[${ctx.author.id}]\`\n` +
                `${client.emoji.info} **Guild :** ${ctx.guild.name.substring(0, 20)} \`[${ctx.guild.id}]\`\n` +
                `${client.emoji.info} **Channel :** ${ctx.channel.name} \`[${ctx.channel.id}]\``),
        ],
    });
};
/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
