/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */
import { Command } from '../../classes/abstract/command.js';
export default class Stats extends Command {
    constructor() {
        super(...arguments);
        this.aliases = ['status'];
        this.description = 'Shows general statistics';
        this.execute = async (client, ctx) => {
            const waitEmbed = await ctx.reply({
                embeds: [
                    client.embed().desc(`${client.emoji.timer} Please wait while I gather relevant data.`),
                ],
            });
            const data = await client.cluster.broadcastEval(async (client) => {
                const totalUsers = client.guilds.cache.reduce((total, guild) => total + guild.memberCount, 0);
                const cpuUsage = (await import('os-utils')).default.cpuUsage;
                const _cpuUsage = await new Promise((resolve) => cpuUsage(resolve));
                const ping = `${client.ws.ping} ms`;
                const users = `${totalUsers / 1000}K`;
                const cpu = `${_cpuUsage.toFixed(2)} %vCPU`;
                const guilds = `${client.guilds.cache.size / 1000}K`;
                const uptime = client.formatDuration(client.uptime);
                const ram = client.formatBytes(process.memoryUsage().rss);
                const stats = `${client.emoji.info} **ShardIds : ** [${[...client.ws.shards].map(([id]) => id).join(', ')}]\n` +
                    `${client.emoji.info} **Websocket ping : ** ${ping}\n` +
                    `${client.emoji.info} **Cluster uptime : ** ${uptime}\n` +
                    `${client.emoji.info} **CPU usage : ** ${cpu}\n` +
                    `${client.emoji.info} **Total servers : ** ${guilds}\n` +
                    `${client.emoji.info} **Total users : ** ${users}\n` +
                    `${client.emoji.info} **Sys RAM usage : ** ${ram}\n`;
                return stats;
            });
            await waitEmbed.edit({
                embeds: [
                    client
                        .embed()
                        .desc(`${client.emoji.check} **Statistics**\n\n` +
                        data
                            .map((statData, index) => `${client.emoji.check} **Cluster ${index}**\n\n${statData}`)
                            .join('\n\n')),
                ],
            });
        };
    }
}
/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
