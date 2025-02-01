/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */
export const resolveCommand = async (ctx, prefix) => {
    const { client } = ctx;
    const args = ctx.content.slice(prefix.length).trim().split(/ +/);
    const cmd = args[0].toLowerCase();
    args.shift();
    const command = client.commands.get(cmd) ||
        client.commands.find((_cmd) => _cmd.aliases && _cmd.aliases.includes(cmd)) ||
        undefined;
    return { command, args };
};
/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
