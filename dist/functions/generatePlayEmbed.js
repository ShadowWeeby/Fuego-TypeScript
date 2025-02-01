/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */
export const generatePlayEmbed = (client, player) => {
    const track = player.queue.current;
    if (!track)
        return client.embed().desc('Lavalink could not provide track details.');
    const { title, author } = track;
    const duration = track.isStream ? `◉ LiVE STREAM` : client.formatDuration(track.length || 369);
    const embed = client
        .embed()
        .title(title.substring(0, 40))
        .desc(`${client.emoji.info} Duration: ${duration}\n` + `${client.emoji.info} Author: ${author}`)
        .img('https://media.discordapp.net/attachments/1210593301552697396/1257585877740421182/Picsart_24-07-02_11-47-35-163.png?ex=6684f19e&is=6683a01e&hm=43b098ca2167291a3108014a2609e1fc6bd8dabc6f980fcd60d8af87908761dd&=&format=webp&quality=lossless&width=401&height=172')
        .footer({
        text: `Track requested by ${track.requester.displayName}`,
    });
    // if (track.thumbnail) embed.img(track.thumbnail?.replace('hqdefault', 'maxresdefault'));
    return embed;
};
/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
