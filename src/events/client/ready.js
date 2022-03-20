module.exports = class Ready extends Event {
    constructor() {
        super({
            name: "ready",
            once: false,
        });
    }

    async exec() {

  this.client.user.setActivity("/help", { type: "WATCHING" });

      this.client.user.setPresence({
        status: "dnd", 
    });

        let allMembers = new Set();
        this.client.guilds.cache.forEach((guild) => {
            guild.members.cache.forEach((member) => {
                allMembers.add(member.user.id);
            });
        });

        let allChannels = new Set();
        this.client.guilds.cache.forEach((guild) => {
            guild.channels.cache.forEach((channel) => {
                allChannels.add(channel.id);
            });
        });
        this.client.logger.log(`${this.client.user.tag} is online`, {
            tag: "Ready",
        });
        this.client.logger.log(
            `\n`,
            {
                tag: "Data",
            }
        );

        const guild = await this.client.guilds.fetch(process.env.EMOJIS_GUILD_ID);
        if (guild) {
            await this.client.loadEmotes(guild).then(() => {
                this.client.logger.log("Ready To Go!", {tag: "Emotes"});
            });
        }

        for (const guild of this.client.guilds.cache.values()) {
            await this.client.loadInteractions(guild.id);
        }
    }
};
