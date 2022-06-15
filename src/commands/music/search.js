const { MessageEmbed } = require("discord.js");
const DMP = require("discord-music-player");

module.exports = class Search extends Interaction {
  constructor() {
    super({
      name: "search",
      description: "Search a song!",
      options: [
        {
          type: "3",
          name: "input",
          description: "song name",
          required: true,
        },
      ],
    });
  }

  async exec(int, data) {

    const novc = new MessageEmbed() .setDescription(`${this.client.emotes.get("supremenomusic")} **You should be in a voice channel!** \n ${this.client.emotes.get("supremeblank")}${this.client.emotes.get("supremedot")} Developer: [Atreya#2401](https://aromaxdev.xyz/github)`)
  .setColor(`#FFFFFF`);

      const novcs = new MessageEmbed() .setDescription(`${this.client.emotes.get("supremenomusic")} **You should be in a my voice channel!** \n ${this.client.emotes.get("supremeblank")}${this.client.emotes.get("supremedot")} Developer: [Atreya#2401](https://aromaxdev.xyz/github)`)
  .setColor(`#FFFFFF`);

      const nodj = new MessageEmbed() .setDescription(`${this.client.emotes.get("supremedj")} **You should be a DJ or Alone in Voice Channel!** \n ${this.client.emotes.get("supremeblank")}${this.client.emotes.get("supremedot")} Developer: [Atreya#2401](https://aromaxdev.xyz/github)`)
  .setColor(`#FFFFFF`);

      const noresult = new MessageEmbed() .setDescription(`${this.client.emotes.get("supremenomusic")} **No results found!** \n ${this.client.emotes.get("supremeblank")}${this.client.emotes.get("supremedot")} Use: \`/play\` [song/url](https://aromaxdev.xyz/github) to play a music.`)
  .setColor(`#FFFFFF`);

const notime = new MessageEmbed() .setDescription(`${this.client.emotes.get("supremeno")} **You took too musch time to respond!** \n ${this.client.emotes.get("supremeblank")}${this.client.emotes.get("supremedot")} Use: \`/play\` [song/url](https://aromaxdev.xyz/github) to play a music.`)
  .setColor(`#FFFFFF`);

    
    const input = int.options.getString("input");

    let channel = int.member.voice.channel;

    if (!channel)
      return int.reply({
        embeds: [novc],
        ephemeral: false,
      });
    if (int.guild.me.voice.channel && channel !== int.guild.me.voice.channel)
      return int.reply({
        embeds: [novcs],
        ephemeral: false,
      });

    let isAllowed = data.voiceChannels.find((c) => c === channel.id);

    if (data.voiceChannels.length > 0 && !isAllowed) {
      return int.reply({
        content: `${this.client.emotes.get(
          "supremenomic"
        )} | You must be in one of the allowed voice channels to use this command!`,
        ephemeral: true,
      });
    }

    int.reply({
      content: `${this.client.emotes.get(
        "supremesearch"
      )} Searching \`${input}\``,
    });

    let hasQueue = this.client.player.hasQueue(int.guild.id);
    let queue;
    if (!hasQueue) {
      queue = this.client.player.createQueue(int.guild.id);
      await queue.join(channel);
    } else {
      queue = this.client.player.getQueue(int.guild.id);
    }

    let results = await DMP.Utils.search(
      input,
      { requestedBy: int.user },
      queue,
      10
    ).catch((e) => {
      console.log(e);
    });

    if (!results) {
      if (!hasQueue) {
        await queue.stop();
      }

      return int.editReply({
        embeds: [noresult],
      });
    }

    let emb = new MessageEmbed()
      .setTitle("Search Results")
      .setColor("#FFFFFF")
      .setDescription(
        `Which song do you want to listen? <Send song position number>\n\n` +
          results.map((r, i) => `[${i + 1}. ${r.name}](${r.url})`).join("\n")
      );

    await int.editReply({ content: " ", embeds: [emb] });

    let filter = (m) => m.author.id === int.user.id;
    let selection = await int.channel
      .awaitMessages({
        filter,
        max: 1,
        time: 30000,
        errors: ["time"],
      })
      .then((m) => {
        let select = m.first().content;

        m.first().delete();
        let song = results.find((r, i) => {
          if (i + 1 === Number(select.replace(/^\D+/g, ""))) {
            return r;
          }
        });

        if (!song) {
          return int.editReply({
            embeds: [noresult],
          });
        }

        int.deleteReply();

        return this.client.play(
          this.client,
          int,
          data,
          song,
          "youtube",
          false,
          true
        );
      })
      .catch(() => {
        return int.editReply({
          embeds: [notime],
        });
      });

    await selection;
  }
};
