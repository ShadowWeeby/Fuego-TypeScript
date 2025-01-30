/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import { EmbedBuilder, ColorResolvable, EmbedFooterOptions } from 'discord.js';

export class ExtendedEmbedBuilder extends EmbedBuilder {
  constructor(color: ColorResolvable) {
    super();
    this.setColor(color);
  }

  title = (title: string) => this.setTitle(title);
  thumb = (uri: string) => this.setThumbnail(uri);
  desc = (text: string) => this.setDescription(text);
  footer = (op: EmbedFooterOptions) => this.setFooter(op);
  img = (uri: string | null) => (uri ? this.setImage(uri) : this);
}

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
