/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import { config } from 'dotenv';
import { log } from './logger.js';
import { existsSync } from 'node:fs';
import { question } from 'readline-sync';
import { fileURLToPath } from 'node:url';
import { bind } from './functions/bind.js';
import { dirname, resolve } from 'node:path';
import { availableParallelism } from 'node:os';
import { decryptConfig } from './functions/decryptConfig.js';
import { ClusterManager, HeartbeatManager } from 'discord-hybrid-sharding';

config();

const mainFile = './fuego.js';
const configFile = './fuego.config.json';
const encryptedFile = './fuego.config.eps';

const __dirname = dirname(fileURLToPath(import.meta.url));

if (existsSync(configFile)) bind(configFile, encryptedFile), process.exit(1);

if (!existsSync(encryptedFile))
  log(`Neither ${configFile} nor ${encryptedFile} found.`, 'error'), process.exit(1);

if (!process.env.IV?.length) process.env.IV = question('Enter Initialization Vector (IV) : ');
if (!process.env.KEY?.length) process.env.KEY = question('Enter Decryption key (Key) : ');

const file = resolve(__dirname, mainFile);

const clusterManager = new ClusterManager(file, {
  respawn: true,
  mode: 'process',
  restarts: {
    max: 10,
    interval: 10_000,
  },
  totalShards: 'auto',
  totalClusters: availableParallelism(),
  token: decryptConfig(encryptedFile).token,
});

clusterManager.extend(
  new HeartbeatManager({
    interval: 2000,
    maxMissedHeartbeats: 5,
  }),
);

clusterManager.spawn({ timeout: -1 });

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
