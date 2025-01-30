/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import axios from 'axios';

export const randomNekoImage = async (endpoint: string) => {
  return await axios
    .get(`https://nekos.best/api/v2/${endpoint}`)
    .then((res) => res.data.results[0].url as string)
    .catch(
      () =>
        `https://media.discordapp.net/attachments/1210593301552697396/1222588572457242654/404.png`,
    );
};

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
