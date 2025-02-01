/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */
import moment from 'moment-timezone';
import { unlink } from 'fs/promises';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { AttachmentBuilder } from 'discord.js';
import { zipper } from '../../utils/zipper.js';
import { Command } from '../../classes/abstract/command.js';
const __dirname = dirname(fileURLToPath(import.meta.url));
export default class Backup extends Command {
    constructor() {
        super(...arguments);
        this.aliases = ['backup'];
        this.description = 'Sends backup-zip to DM';
        this.execute = async (client, ctx) => {
            const metadata = JSON.parse(await readFile(resolve(__dirname, '../../../package.json'), 'utf8'));
            const time = moment().tz('Asia/Kolkata').format('DD_MM_YY_hh_mm');
            const file = `./${metadata.name}_v${metadata.version}_${time}.zip`;
            const waitEmbed = await ctx.reply({
                embeds: [
                    client.embed().desc(`${client.emoji.timer} Please wait while I am preparing \`${file}\`.`),
                ],
            });
            await zipper(file);
            const sent = await ctx.author
                .send({
                files: [
                    new AttachmentBuilder(file, {
                        name: file,
                    }),
                ],
            })
                .then(() => true)
                .catch((error) => (console.log(error), false));
            await waitEmbed.edit({
                embeds: [
                    client
                        .embed()
                        .desc(sent ?
                        `${client.emoji.check} Successfully sent \`${file}\` to DM.`
                        : `${client.emoji.cross} Failed to send \`${file}\` to DM. Check console for details.`),
                ],
            });
            await unlink(file);
        };
    }
}
/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
