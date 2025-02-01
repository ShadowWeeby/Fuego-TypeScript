/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */
export class Command {
    constructor() {
        this.usage = '';
        this.nsfw = false;
        this.admin = false;
        this.owner = false;
        this.inVC = false;
        this.inSameVC = false;
        this.player = false;
        this.playing = false;
        this.cooldown = 5;
        this.aliases = [];
        this.slash = true;
        this.options = [];
        this.userPerms = [];
        /** Assigned dynamically when loading ( `file.name.toLowerCase()` ) */
        this.name = '';
        /** Assigned dynamically when loading ( `folder.name.toLowerCase()` ) */
        this.category = '';
    }
}
/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
