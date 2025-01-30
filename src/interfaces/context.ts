/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import {
  User,
  Role,
  Guild,
  Channel,
  Message,
  Attachment,
  Collection,
  GuildMember,
  MessageReaction,
  BaseMessageOptions,
  CommandInteraction,
  GuildTextBasedChannel,
  EmojiIdentifierResolvable,
} from 'discord.js';
import { ExtendedClient } from '../classes/client.js';

export interface Context {
  id: string;
  guild: Guild;
  author: User;
  content: string;
  guildId: string;
  channelId: string;
  message?: Message;
  member: GuildMember;
  client: ExtendedClient;
  channel: GuildTextBasedChannel;
  interaction?: CommandInteraction;
  mentions: {
    everyone: boolean;
    users?: Collection<string, User>;
    roles?: Collection<string, Role>;
    channels?: Collection<string, Channel>;
    members?: Collection<string, GuildMember>;
  };
  createdTimestamp: number;
  attachments?: Collection<string, Attachment>;
  send: (args: BaseMessageOptions) => Promise<Message<boolean>>;
  reply: (args: BaseMessageOptions) => Promise<Message<boolean>>;
  react: (emoji: EmojiIdentifierResolvable, args?: BaseMessageOptions) => Promise<MessageReaction>;
}

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
