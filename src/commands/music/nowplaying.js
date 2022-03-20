const { MessageEmbed } = require("discord.js");
const sf = require("seconds-formater");
const { progressBar } = require("../../player/functions/progress-bar");
const { msToSeconds } = require("../../utils/Utils");

module.exports = class NowPlaying extends Interaction {
  constructor() {
    super({
      name: "nowplaying",
      description: "Displays the current playing track",
    });
  }

  async exec(int, data, client) {


    const { MessageActionRow, MessageButton } = require("discord.js");
const btn1 = new MessageButton()
      .setLabel("Support")
        .setEmoji(`954350666539753512`)
      .setStyle("LINK")
          .setURL(`https://discord.gg/whJeF4mDAX`);

    const btn2 = new MessageButton()
      .setLabel("Invite")
      .setStyle("LINK")
      .setEmoji(`954610269609394187`)
          .setURL(`https://discord.com/api/oauth2/authorize?client_id=${this.client.user.id}&permissions=8&scope=bot%20applications.commands`);

let buttonList = [btn1, btn2];
const row = new MessageActionRow().addComponents(buttonList);

         
const novc = new MessageEmbed() .setDescription(`${this.client.emotes.get("supremenomusic")} **You should be in a voice channel!** \n ${this.client.emotes.get("supremeblank")}${this.client.emotes.get("supremedot")} Developer: [Supreme#2401](https://diwasatreya.tech/github)`)
  .setColor(`#FFFFFF`);

      const novcs = new MessageEmbed() .setDescription(`${this.client.emotes.get("supremenomusic")} **You should be in a my voice channel!** \n ${this.client.emotes.get("supremeblank")}${this.client.emotes.get("supremedot")} Developer: [Supreme#2401](https://diwasatreya.tech/github)`)
  .setColor(`#FFFFFF`);

      const nodj = new MessageEmbed() .setDescription(`${this.client.emotes.get("supremedj")} **You should be a DJ or Alone in Voice Channel!** \n ${this.client.emotes.get("supremeblank")}${this.client.emotes.get("supremedot")} Developer: [Supreme#2401](https://diwasatreya.tech/github)`)
  .setColor(`#FFFFFF`);

      const nomusic = new MessageEmbed() .setDescription(`${this.client.emotes.get("supremenomusic")} **Nothing is playing in this server!** \n ${this.client.emotes.get("supremeblank")}${this.client.emotes.get("supremedot")} Use: \`/play\` [song/url](https://diwasatreya.tech/github) to play a music.`)
  .setColor(`#FFFFFF`);
    let channel = int.member.voice.channel;

    if (!channel)
      return int.reply({
        embeds: [novc],
        components: [row],
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

    let hasQueue = this.client.player.hasQueue(int.guild.id);
    if (!hasQueue) {
      return int.reply({
        embeds: [nomusic],
        components: [row],
        ephemeral: false,
      });
    }

    let queue = this.client.player.getQueue(int.guild.id);

    let song = queue.nowPlaying;
    if (!song) {
      return int.reply({
        embeds: [nomusic],
        ephemeral: false,
      });
    }

    let total = song.milliseconds;
    let stream = queue.connection.player._state.resource.playbackDuration;

    let seconds = msToSeconds(stream);
    let time;
    if (seconds === 86400) {
      time = sf.convert(seconds).format("D day");
    } else if (seconds >= 3600) {
      time = sf.convert(seconds).format("H:MM:SS");
    } else {
      time = sf.convert(seconds).format("M:SS");
    }

    let np = new MessageEmbed()
      .setColor("#FFFFFF")
      .setDescription(
        `${this.client.emotes.get("supremeblank")}${this.client.emotes.get("supremeblank")}**Playing:** __${song.name.split(' ').slice(0, 5).join(' ')}__ ${this.client.emotes.get("supremeblank")}${this.client.emotes.get("supremeblank")} \n\n ${this.client.emotes.get("supremeblank")}${progressBar(
          total,
          stream,
          18,
          "▬",
          this.client.emotes.get("line"),
          this.client.emotes.get("supremenp")
        )} ${this.client.emotes.get("supremeblank")} \n${time} ${this.client.emotes.get("supremeblank")} ${this.client.emotes.get("supremeblank")} ${this.client.emotes.get("supremeblank")} ${this.client.emotes.get("supremeblank")} ${this.client.emotes.get("supremeblank")} ${this.client.emotes.get("supremeblank")} ${this.client.emotes.get("supremeblank")} ${this.client.emotes.get("supremeblank")} ${this.client.emotes.get("supremeblank")} ${this.client.emotes.get("supremeblank")}${this.client.emotes.get("supremeblank")}${this.client.emotes.get("supremeblank")}${song.duration}`
      );

    return int.reply({ embeds: [np] });
  }
};
