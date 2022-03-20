module.exports = class SlashCommands extends Event {
    constructor() {
        super({
            name: "slashCommands",
            once: false,
        });
    }

    async exec(interaction, data) {
        const cmd = this.client.interactions.get(interaction.commandName);

        if (!cmd) return;

        try {
            await cmd.exec(interaction, data);
        } catch (err) {
            if (interaction.replied || interaction.deferred) {
                if (!interaction.ephemeral) {
                    await interaction.editReply({
                        content:
                            "Oops! New Error again please report in our server with every details :)",
                    });
                } else {
                    interaction.channel.send({
                        content:
                            "Oops! New Error again please report in our server with every details :)",
                    });
                }
            } else {
                interaction.reply({
                    ephemeral: true,
                    content:
                        "Oops! New Error again please report in our server with every details :)",
                });
            }
            return this.client.logger.error(
                `\nError occured while trying to trigger slashCommands\n${
                    err.stack ? err + "\n\n" + err.stack : err
                }`,
                {
                    tag: "Interaction",
                }
            );
        }
    }
};
