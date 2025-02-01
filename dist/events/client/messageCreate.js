/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */
import { createContext } from '../../functions/contextFrom/message.js';
const event = 'messageCreate';
export default class MessageCreate {
    constructor() {
        this.name = event;
        this.execute = async (client, message) => {
            if (!message.author)
                return;
            if (message.author.bot)
                return;
            if (message.content.includes('jsk'))
                return void (await client.dokdo?.run(message));
            client.emit('ctxCreate', await createContext(client, message));
        };
    }
}
/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
