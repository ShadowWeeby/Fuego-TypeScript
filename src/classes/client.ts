/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import moment from 'moment';
import Josh from '@joshdb/core';
import { readdirSync } from 'fs';
import { Manager } from './manager.js';
import { fileURLToPath } from 'node:url';
import { emoji } from '../assets/emoji.js';
import format from 'moment-duration-format';
import { josh } from '../functions/josh.js';
import { log, LogLevel } from '../logger.js';
import { dirname, resolve } from 'node:path';
import { Command } from './abstract/command.js';
import { ExtendedEmbedBuilder } from './embed.js';
import { ExtendedButtonBuilder } from './button.js';
import { OAuth2Scopes } from 'discord-api-types/v10';
import { readyEvent } from '../functions/readyEvent.js';
import { WebhookConfig } from '../interfaces/config.js';
import { Client, Partials, Collection } from 'discord.js';
import { Client as dokdoClient } from '../../dokdo/index.js';
import { decryptConfig } from '../functions/decryptConfig.js';
import { ClusterClient, getInfo } from 'discord-hybrid-sharding';
import { WebhookClient, ColorResolvable, GatewayIntentBits } from 'discord.js';

format(moment);

const __dirname = dirname(fileURLToPath(import.meta.url));

export class ExtendedClient extends Client {
  constructor() {
    super({
      partials: [
        Partials.User,
        Partials.Channel,
        Partials.Message,
        Partials.Reaction,
        Partials.GuildMember,
        Partials.ThreadMember,
        Partials.GuildScheduledEvent,
      ],

      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessageReactions,
      ],

      failIfNotExists: false,

      shards: getInfo().SHARD_LIST,
      shardCount: getInfo().TOTAL_SHARDS,

      allowedMentions: {
        repliedUser: false,
        parse: ['users', 'roles'],
      },

      sweepers: {
        users: {
          interval: 3_600,
          filter: () => (user) => user.id !== this.user?.id,
        },
        guildMembers: {
          interval: 3_600,
          filter: () => (member) => member.id !== this.user?.id,
        },
      },
    });

    this.on('debug', (data) => this.log(data));
    this.on('ready', async () => await readyEvent(this));
    this.on('messageUpdate', (_, m) => (m.partial ? null : this.emit('messageCreate', m)));
  }

  emoji = emoji;
  config = decryptConfig('./fuego.config.eps');

  manager = Manager.init(this);

  underMaintenance = false;
  prefix = this.config.prefix;
  owners = this.config.owners;
  admins = this.config.admins;

  db = {
    noPrefix: josh('noPrefix') as Josh<boolean | null>,
    blacklist: josh('blacklist') as Josh<boolean | null>,
    stats: {
      songsPlayed: josh('stats/songsPlayed') as Josh<number | null>,
      commandsUsed: josh('stats/commandsUsed') as Josh<number | null>,
    },
    twoFourSeven: josh('twoFourSeven') as Josh<{ textId: string; voiceId: string } | null>,
  };
  dokdo: dokdoClient | null = null;

  invite = {
    admin: () =>
      this.generateInvite({
        scopes: [OAuth2Scopes.Bot],
        permissions: ['Administrator'],
      }),
    required: () =>
      this.generateInvite({
        scopes: [OAuth2Scopes.Bot],
        permissions: ['Administrator'],
      }),
  };

  cluster = new ClusterClient(this);

  commands: Collection<string, Command> = new Collection();
  categories = readdirSync(resolve(__dirname, '../commands'));
  cooldowns: Collection<string, Collection<string, number>> = new Collection();

  connectToGateway = () => (this.login(this.config.token), this);

  log = (message: string, type?: LogLevel) => void log(message, type);

  sleep = async (s: number) =>
    void (await new Promise((resolve) => void setTimeout(resolve, s * 1000)));

  button = () => new ExtendedButtonBuilder();
  embed = (color?: ColorResolvable) => new ExtendedEmbedBuilder(color || this.config.color);

  formatBytes = (bytes: number) => {
    const power = Math.floor(Math.log(bytes) / Math.log(1024));
    return (
      `${parseFloat((bytes / Math.pow(1024, power)).toFixed(2))} ` +
      `${['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][power]}`
    );
  };

  formatDuration = (duration: number) =>
    moment.duration(duration, 'milliseconds').format('d[d] h[h] m[m] s[s]', 0, {
      trim: 'all',
    });

  getPlayer = (ctx: { guild: { id: string } }) => this.manager.players.get(ctx.guild.id);

  webhooks = Object.fromEntries(
    Object.entries(this.config.webhooks).map(([hook, url]) => [hook, new WebhookClient({ url })]),
  ) as { [key in keyof WebhookConfig]: WebhookClient };
}

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
