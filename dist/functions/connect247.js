/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */
export const connect247 = async (client, guildId) => {
    if (client.getPlayer({ guild: { id: guildId } }))
        return false;
    const guild = client.guilds.cache.get(guildId);
    if (!guild)
        return await client.db.twoFourSeven.delete(guildId), false;
    const data = await client.db.twoFourSeven.get(guild.id);
    const textChannel = guild.channels.cache.get(data.textId);
    const voiceChannel = guild.channels.cache.get(data.voiceId);
    if (!(textChannel?.isTextBased() && voiceChannel?.isVoiceBased()))
        return await client.db.twoFourSeven.delete(guild.id), false;
    await client.manager.createPlayer({
        deaf: true,
        guildId: guild.id,
        textId: textChannel.id,
        shardId: guild.shardId,
        voiceId: voiceChannel.id,
    });
    await textChannel
        .send({
        embeds: [
            client
                .embed()
                .desc(`${client.emoji.info} 247 player created in <#${voiceChannel.id}> and bound to <#${textChannel.id}>.`),
        ],
    })
        .then(async (message) => {
        await client.sleep(5);
        await message.delete();
    });
    return true;
};
/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
