/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import { Client } from '../../dokdo/index.js';
import { loadEvents } from '../loaders/events.js';
import { loadCommands } from '../loaders/msgCmds.js';
import { ExtendedClient } from '../classes/client.js';
import { connect247 } from '../functions/connect247.js';
import { deploySlashCommands } from '../loaders/slashCmds.js';

const load247Players = async (client: ExtendedClient) => {
  let players = 0;
  const guildIds = await client.db.twoFourSeven.keys;

  client.log('Loading 247 players.', 'info');
  for (const guildId of guildIds) if (await connect247(client, guildId)) players++;
  client.log(`Loaded all loadable 247 players ( ${players} / ${guildIds.length} ).`, 'success');
};

export const readyEvent = async (client: ExtendedClient) => {
  client.user!.setPresence({
    status: 'online',
    activities: [
      {
        type: 4,
        name: `By ━● 1sT-Services | ${client.config.prefix}help`,
      },
    ],
  });
  client.log(`Logged in as ${client.user!.tag} [${client.user!.id}]`, 'success');

  client.log('Attaching event listeners to client.');
  await loadEvents(client);

  client.log('Loading data in <client>.commands collection for message based commands.');
  await loadCommands(client);

  client.log('Loading and registering all application / slash commands.');
  await deploySlashCommands(client);

  client.dokdo = new Client(client, {
    aliases: ['jsk'],
    prefix: client.prefix,
    owners: ['692617937512562729'],
  });

  const guildCount = client.guilds.cache.size;
  process.env.SHELL = process.platform === 'win32' ? 'powershell' : 'bash';
  const userCount = {
    cached: client.users.cache.size,
    total: client.guilds.cache.reduce((total, guild) => total + guild.memberCount, 0),
  };

  client.log(
    `Ready for ${guildCount} guilds, and a total of ${userCount.total} ( ${userCount.cached} cached ) users.`,
    'info',
  );

  if ([...client.manager.shoukaku.nodes][0][1].state === 2) return await load247Players(client);

  client.manager.shoukaku.once('ready', async () => await load247Players(client));
};

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
