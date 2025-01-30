/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import { Context } from './context.js';
import { Command } from '../classes/abstract/command.js';
import { KazagumoPlayer, KazagumoTrack } from 'kazagumo';
import { ButtonInteraction, ClientEvents } from 'discord.js';

interface _ClientEvents extends ClientEvents {
  ctxCreate: [ctx: Context];
  buttonClick: [Interaction: ButtonInteraction];
}

interface _ContextEvents {
  blUser: [ctx: Context];
  mention: [ctx: Context];
  underMaintenance: [ctx: Context];
  infoRequested: [ctx: Context, command: Command];
}

interface _PlayerEvents {
  playerDestroy: [player: KazagumoPlayer];
  playerButtonClick: [Interaction: ButtonInteraction];
  trackStart: [player: KazagumoPlayer, track: KazagumoTrack];
}

export interface Events extends _ClientEvents, _ContextEvents, _PlayerEvents {}

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
