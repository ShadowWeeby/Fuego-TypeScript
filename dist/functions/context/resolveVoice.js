/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */
export const resolveVoice = async (ctx, command) => {
    const { client } = ctx;
    if (!(command.inVC || command.inSameVC))
        return true;
    const memberVc = ctx.member.voice.channel;
    const botVc = ctx.guild.members.me.voice.channel;
    if (!memberVc) {
        await ctx.reply({
            embeds: [
                client
                    .embed()
                    .desc(`${client.emoji.cross} You must be in a voice channel to use this command.`),
            ],
        });
        return false;
    }
    if (command.inSameVC && botVc && botVc.id != memberVc.id) {
        await ctx.reply({
            embeds: [
                client.embed().desc(`${client.emoji.cross} You must be in ${botVc} to use this command.`),
            ],
        });
        return false;
    }
    return true;
};
/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
