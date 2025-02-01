/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */
import chalk from 'chalk';
import moment from 'moment-timezone';
const logStyles = {
    info: chalk.hex('#66ccff'),
    warn: chalk.hex('#ffaa00'),
    debug: chalk.hex('#555555'),
    error: chalk.hex('#ff2200'),
    success: chalk.hex('#77ee55'),
};
export const log = (content, logLevel = 'debug') => void console[logLevel === 'success' ? 'log' : logLevel](`${moment().tz('Asia/Kolkata').format('DD-MM-YYYY hh:mm:ss Z')} ${logStyles[logLevel](content)}`);
/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
