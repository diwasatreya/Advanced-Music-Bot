module.exports = class GuildCreate extends Event {
  constructor() {
    super({
      name: "guildCreate",
      once: false,
    });
  }
  async exec(guild) {
    await this.client.getGuild({ _id: guild.id });
    await this.client.loadInteractions(guild.id);

    this.client.logger.log(`Added in server ${guild.name} (${guild.id})!`, {
      tag: "guildCreate",
    });
  }
};
