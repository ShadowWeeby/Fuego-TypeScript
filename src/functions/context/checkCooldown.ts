/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import { Collection } from 'discord.js';
import { fromMs } from '../ms/fromMs.js';
import { limited } from '../../utils/ratelimiter.js';
import { Context } from '../../interfaces/context.js';
import { RateLimitManager } from '@sapphire/ratelimits';
import { Command } from '../../classes/abstract/command.js';

const cooldownRateLimitManager = new RateLimitManager(5000);

export const isUnderCooldown = async (ctx: Context, command: Command) => {
  const { client } = ctx;

  if (limited(ctx.author.id)) return client.emit('blUser', ctx), false;

  if (!client.cooldowns.has(command.name)) client.cooldowns.set(command.name, new Collection());

  const now = Date.now();
  const timestamps = client.cooldowns.get(command.name)!;
  const cooldownAmount = command.cooldown * 1000 || 3_000;

  if (!timestamps.has(ctx.author.id)) {
    timestamps.set(ctx.author.id, now);
    setTimeout(() => timestamps.delete(ctx.author.id), cooldownAmount);
    return false;
  }

  const expirationTime = timestamps.get(ctx.author.id)! + cooldownAmount;

  if (now > expirationTime) return false;

  const cooldownMessageRlBucket = cooldownRateLimitManager.acquire(
    `${ctx.author.id}_${command.name}`,
  );

  if (cooldownMessageRlBucket.limited) return false;
  cooldownMessageRlBucket.consume();

  await ctx.reply({
    embeds: [
      client
        .embed()
        .desc(
          `${client.emoji.cross} Please wait ${fromMs(
            Math.round(expirationTime - now),
          )} before reusing this command.`,
        ),
    ],
  });

  return true;
};

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
