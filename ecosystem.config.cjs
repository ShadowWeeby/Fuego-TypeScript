/**
 * @fuego v-1.0.0 by painfuego
 * @copyright 2024 1sT - Services - CC BY-NC-SA 4.0
 */

module.exports = {
  apps: [
    {
      instances: 1,
      name: 'lavalink',
      script: 'java',
      args: '-jar Lavalink.jar',
      interpreter: 'none',
      max_memory_restart: '1024M',

      out_file: './logs/lava-out.log',
      log_date_format: 'DD-MM HH:mm:ss Z',
      error_file: './logs/lava-error.log',
    },
    {
      instances: 1,
      name: 'fuego',
      script: 'npm',
      args: 'run deploy',
      interpreter: 'none',
      max_memory_restart: '500M',

      out_file: './logs/fuego-out.log',
      log_date_format: 'DD-MM HH:mm:ss Z',
      error_file: './logs/fuego-error.log',
    },
  ],
};

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
