const paginationEmbed = require("../../utils/Pagination");
const { MessageEmbed, MessageButton } = require("discord.js");

module.exports = class Queue extends Interaction {
  constructor() {
    super({
      name: "queue",
      description: "Displays the queue of songs",
    });
  }

  async exec(int, data) {
const novc = new MessageEmbed() .setDescription(`${this.client.emotes.get("supremenomusic")} **You should be in a voice channel!** \n ${this.client.emotes.get("supremeblank")}${this.client.emotes.get("supremedot")} Developer: [Atreya#2401](https://aromaxdev.xyz/github)`)
  .setColor(`#FFFFFF`);

      const novcs = new MessageEmbed() .setDescription(`${this.client.emotes.get("supremenomusic")} **You should be in a my voice channel!** \n ${this.client.emotes.get("supremeblank")}${this.client.emotes.get("supremedot")} Developer: [Atreya#2401](https://aromaxdev.xyz/github)`)
  .setColor(`#FFFFFF`);

      const nodj = new MessageEmbed() .setDescription(`${this.client.emotes.get("supremedj")} **You should be a DJ or Alone in Voice Channel!** \n ${this.client.emotes.get("supremeblank")}${this.client.emotes.get("supremedot")} Developer: [Atreya#2401](https://aromaxdev.xyz/github)`)
  .setColor(`#FFFFFF`);

      const nomusic = new MessageEmbed() .setDescription(`${this.client.emotes.get("supremenomusic")} **Nothing is playing in this server!** \n ${this.client.emotes.get("supremeblank")}${this.client.emotes.get("supremedot")} Use: \`/play\` [song/url](https://aromaxdev.xyz/github) to play a music.`)
  .setColor(`#FFFFFF`);

      
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
          "supremenomusic"
        )} | You must be in one of the allowed voice channels to use this command!`,
        ephemeral: true,
      });
    }

    let queue = this.client.player.getQueue(int.guild.id);
    if (!queue || !queue.songs.length)
      return int.reply({
        embeds: [nomusic],
        ephemeral: false,
      });

    let btn1 = new MessageButton()
      .setCustomId("previousbtn")
      .setLabel(" ")
        .setEmoji(`954422283211014194`)
      .setStyle("SECONDARY");

    const btn2 = new MessageButton()
      .setCustomId("nextbtn")
      .setLabel(" ")
        .setEmoji(`954422273740255273`)
      .setStyle("SECONDARY");


      const btn3 = new MessageButton()
      .setLabel(" ")
        .setEmoji(`954345474289201152`)
      .setStyle("LINK")
          .setURL(`https://discord.gg/whJeF4mDAX`);
      

    let currentEmbedItems = [];
    let embedItemArray = [];
    let pages = [];

    let buttonList = [btn1, btn2, btn3];

    if (queue.songs.length > 11) {
      queue.songs.forEach((s, i) => {
        s.index = i;
        if (s.name !== queue.nowPlaying.name) {
          if (currentEmbedItems.length < 10) currentEmbedItems.push(s);
          else {
            embedItemArray.push(currentEmbedItems);
            currentEmbedItems = [s];
          }
        }
      });
      embedItemArray.push(currentEmbedItems);

      embedItemArray.forEach((x) => {
        let songs = x
          .map((s) => `${this.client.emotes.get("supremedot")} [${s.index}. ${s.name.split(' ').slice(0, 6).join(' ')}](${s.url})`)
          .join(`\n`);
        let emb = new MessageEmbed()
          .setTitle("Queue of Songs")
          .setColor("#FFFFFF")
          .setDescription(
`${this.client.emotes.get("supremeprefix")} **Now playing:** \n${this.client.emotes.get("supremeblank")} *[${queue.nowPlaying.name.split(' ').slice(0, 7).join(' ')}](${queue.nowPlaying.url})*\n\n${this.client.emotes.get("supremeradio")} **Next Playing:**\n${songs}`
          );
        pages.push(emb);
      });

      await paginationEmbed(int, pages, buttonList);
    } else {
      let songs = queue.songs
        .map((s, i) => {
          if (s.name !== queue.nowPlaying.name) {
            return `${this.client.emotes.get("supremedot")} [${i}. ${s.name}](${s.url})`;
          }
        })
        .join(`\n`);

      let emb = new MessageEmbed()
        .setTitle("Queue of Songs")
        .setColor("#FFFFFF")
          .setDescription(
`${this.client.emotes.get("supremeprefix")} **Now playing:** \n${this.client.emotes.get("supremeblank")} *[${queue.nowPlaying.name.split(' ').slice(0, 7).join(' ')}](${queue.nowPlaying.url})*\n\n${this.client.emotes.get("supremeradio")} **Next Playing:**\n${songs}`)
        .setFooter("Page 1 / 1");
      return int.reply({ embeds: [emb] });
    }
  }
};
