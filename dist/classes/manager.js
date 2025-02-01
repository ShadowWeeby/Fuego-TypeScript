/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */
import apple from 'kazagumo-apple';
import deezer from 'kazagumo-deezer';
import { Connectors } from 'shoukaku';
import spotify from 'kazagumo-spotify';
import { Kazagumo, Plugins } from 'kazagumo';
import { autoplay } from '../functions/autoplay.js';
export class Manager {
    static { this.init = (client) => {
        const manager = new Kazagumo({
            plugins: [
                new deezer(),
                new apple({
                    imageWidth: 600,
                    imageHeight: 900,
                    countryCode: 'us',
                }),
                new spotify({
                    searchLimit: 10,
                    albumPageLimit: 1,
                    searchMarket: 'IN',
                    playlistPageLimit: 1,
                    clientId: '500295ff7af14eab8867381183553638',
                    clientSecret: '5c5696323ce54e18bffb79e02f1e8ebb',
                }),
                new Plugins.PlayerMoved(client),
            ],
            defaultSearchEngine: 'youtube',
            send: (guildId, payload) => client.guilds.cache.get(guildId)?.shard.send(payload),
        }, new Connectors.DiscordJS(client), [
            {
                secure: false,
                auth: 'painfuego',
                url: 'localhost:65175',
                name: 'Hostza - ::65175',
            },
        ], {
            userAgent: `@painfuego/fuego/v1.0.0/21_N-2K021-ST`,
        });
        manager.on('playerStuck', async (player) => await player.destroy());
        manager.on('playerException', async (player) => await player.destroy());
        manager.on('playerStart', (...args) => client.emit('trackStart', ...args));
        manager.on('playerDestroy', (...args) => client.emit('playerDestroy', ...args));
        manager.shoukaku.on('error', (_, error) => client.log(JSON.stringify(error), 'error'));
        manager.shoukaku.on('ready', (name) => client.log(`Node : ${name} connected`, 'success'));
        // track end
        manager.on('playerEnd', async (player) => await player.data.get('playEmbed')?.delete());
        // queue end
        manager.on('playerEmpty', async (player) => player.data.get('autoplayStatus') ? await autoplay(client, player) : await player.destroy());
        return manager;
    }; }
}
/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
