/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */
import { RateLimitManager } from '@sapphire/ratelimits';
const manager = new RateLimitManager(5000, 7);
export const limited = (key) => {
    if (manager.acquire(key).limited) {
        return true;
    }
    manager.acquire(key).consume();
    return false;
};
/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
