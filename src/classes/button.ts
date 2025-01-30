/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import { ButtonStyle, ButtonBuilder, ComponentEmojiResolvable } from 'discord.js';

type ButtonOptions = [
  customId: string,
  label?: string,
  emoji?: ComponentEmojiResolvable,
  disabled?: boolean,
];

export class ExtendedButtonBuilder extends ButtonBuilder {
  private makeButton(style: ButtonStyle, ...args: ButtonOptions) {
    const [customId, label, emoji, disabled] = args;

    if (label) this.setLabel(label);
    if (emoji) this.setEmoji(emoji);
    if (disabled) this.setDisabled(disabled);
    return this.setCustomId(customId).setStyle(style);
  }

  link = (label: string, uri: string) =>
    this.setStyle(ButtonStyle.Link).setURL(uri).setLabel(label);

  danger = (...args: ButtonOptions) => this.makeButton(ButtonStyle.Danger, ...args);
  primary = (...args: ButtonOptions) => this.makeButton(ButtonStyle.Primary, ...args);
  success = (...args: ButtonOptions) => this.makeButton(ButtonStyle.Success, ...args);
  secondary = (...args: ButtonOptions) => this.makeButton(ButtonStyle.Secondary, ...args);
}

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
