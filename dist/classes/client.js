/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */
import moment from 'moment';
import { readdirSync } from 'fs';
import { Manager } from './manager.js';
import { fileURLToPath } from 'node:url';
import { emoji } from '../assets/emoji.js';
import format from 'moment-duration-format';
import { josh } from '../functions/josh.js';
import { log } from '../logger.js';
import { dirname, resolve } from 'node:path';
import { ExtendedEmbedBuilder } from './embed.js';
import { ExtendedButtonBuilder } from './button.js';
import { OAuth2Scopes } from 'discord-api-types/v10';
import { readyEvent } from '../functions/readyEvent.js';
import { Client, Partials, Collection } from 'discord.js';
import { decryptConfig } from '../functions/decryptConfig.js';
import { ClusterClient, getInfo } from 'discord-hybrid-sharding';
import { WebhookClient, GatewayIntentBits } from 'discord.js';
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
        this.emoji = emoji;
        this.config = decryptConfig('./fuego.config.eps');
        this.manager = Manager.init(this);
        this.underMaintenance = false;
        this.prefix = '1';
        this.owners = [' ', ' '];
        this.admins = [' ', ' '];
        this.db = {
            noPrefix: josh('noPrefix'),
            blacklist: josh('blacklist'),
            stats: {
                songsPlayed: josh('stats/songsPlayed'),
                commandsUsed: josh('stats/commandsUsed'),
            },
            twoFourSeven: josh('twoFourSeven'),
        };
        this.dokdo = null;
        this.invite = {
            admin: () => this.generateInvite({
                scopes: [OAuth2Scopes.Bot],
                permissions: ['Administrator'],
            }),
            required: () => this.generateInvite({
                scopes: [OAuth2Scopes.Bot],
                permissions: ['Administrator'],
            }),
        };
        this.cluster = new ClusterClient(this);
        this.commands = new Collection();
        this.categories = readdirSync(resolve(__dirname, '../commands'));
        this.cooldowns = new Collection();
        this.connectToGateway = () => (this.login('token daal'), this);
        this.log = (message, type) => void log(message, type);
        this.sleep = async (s) => void (await new Promise((resolve) => void setTimeout(resolve, s * 1000)));
        this.button = () => new ExtendedButtonBuilder();
        this.embed = (color) => new ExtendedEmbedBuilder(color || this.config.color);
        this.formatBytes = (bytes) => {
            const power = Math.floor(Math.log(bytes) / Math.log(1024));
            return (`${parseFloat((bytes / Math.pow(1024, power)).toFixed(2))} ` +
                `${['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][power]}`);
        };
        this.formatDuration = (duration) => moment.duration(duration, 'milliseconds').format('d[d] h[h] m[m] s[s]', 0, {
            trim: 'all',
        });
        this.getPlayer = (ctx) => this.manager.players.get(ctx.guild.id);
        this.webhooks = Object.fromEntries(Object.entries(this.config.webhooks).map(([hook, url]) => [hook, new WebhookClient({ url })]));
        this.on('debug', (data) => this.log(data));
        this.on('ready', async () => await readyEvent(this));
        this.on('messageUpdate', (_, m) => (m.partial ? null : this.emit('messageCreate', m)));
    }
}
/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
