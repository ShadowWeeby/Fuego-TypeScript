/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */
import { log } from '../logger.js';
const handleCrash = (type, ...args) => {
    const err = `${args[0]}`.toLowerCase();
    if (err.includes('unknown message') || err.includes('already destroyed')) {
        return;
    }
    log(`[ Anti-Crash ] - ${type} - ${args[0]}:`, 'error');
    console.error(...args);
};
export const loadAntiCrash = () => {
    log('[ Anti-Crash ] is now ◉ LiVE checking over crashes', 'success');
    process.on('uncaughtException', (...args) => handleCrash('UncaughtException', ...args));
    process.on('unhandledRejection', (...args) => handleCrash('UnhandledRejection', ...args));
};
/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
