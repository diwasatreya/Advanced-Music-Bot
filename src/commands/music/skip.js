const { MessageEmbed } = require("discord.js");
module.exports = class Skip extends Interaction {
  constructor() {
    super({
      name: "skip",
      description: "Skips the current track",
    });
  }

  async exec(int, data) {

const novc = new MessageEmbed() .setDescription(`${this.client.emotes.get("supremenomusic")} **You should be in a voice channel!** \n ${this.client.emotes.get("supremeblank")}${this.client.emotes.get("supremedot")} Developer: [Supreme#2401](https://diwasatreya.tech/github)`)
  .setColor(`#FFFFFF`);

      const novcs = new MessageEmbed() .setDescription(`${this.client.emotes.get("supremenomusic")} **You should be in a my voice channel!** \n ${this.client.emotes.get("supremeblank")}${this.client.emotes.get("supremedot")} Developer: [Supreme#2401](https://diwasatreya.tech/github)`)
  .setColor(`#FFFFFF`);

      const nodj = new MessageEmbed() .setDescription(`${this.client.emotes.get("supremedj")} **You should be a DJ or Alone in Voice Channel!** \n ${this.client.emotes.get("supremeblank")}${this.client.emotes.get("supremedot")} Developer: [Supreme#2401](https://diwasatreya.tech/github)`)
  .setColor(`#FFFFFF`);
      
      const nomusic = new MessageEmbed() .setDescription(`${this.client.emotes.get("supremenomusic")} **Nothing is playing in this server!** \n ${this.client.emotes.get("supremeblank")}${this.client.emotes.get("supremedot")} Use: \`/play\` [song/url](https://diwasatreya.tech/github) to play a music.`)
  .setColor(`#FFFFFF`);


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

    let queue = this.client.player.getQueue(int.guild.id);
    if (!queue || !queue.nowPlaying)
      return int.reply({
        embeds: [nomusic],
        components: [row],
        ephemeral: false,
      });

    let isDJ = data.djRoles.some((r) => int.member._roles.includes(r));
    let members = channel.members.filter((m) => !m.user.bot);

    if (members.size > 1 && !isDJ && !int.member.permissions.has("MANAGE_GUILD")) {
      let required = members.size === 2 ? 2 : Math.ceil(members.size / 2);

      if (queue.skipVotes.includes(int.user.id)) {
        return int.reply({
          content: "You've already voted to skip the current track!",
          ephemeral: true,
        });
      }

      queue.skipVotes.push(int.user.id);
      int.reply({
        content: `You voted to skip the current track! **${queue.skipVotes.length}/${required}**`,
      });

      if (queue.skipVotes.length >= required) {
        queue.skipVotes = [];
        let skipped = queue.skip();

        const donee = new MessageEmbed() .setDescription(`${this.client.emotes.get("supremeskip")} **Skipped ${
          skipped.name.split(' ').slice(0, 5).join(' ')
        }!** \n ${this.client.emotes.get("supremeblank")}${this.client.emotes.get("supremelink")} Gitub: [Follow Me](https://diwasatreya.tech/github)`)
  .setColor(`#FFFFFF`);
        
        int.reply({
        embeds: [donee],
        ephemeral: false,
      });
      }
    } else {
      queue.skipVotes = [];
      let skipped = queue.skip();

      const done = new MessageEmbed() .setDescription(`${this.client.emotes.get("supremeskip")} **Skipped ${
          skipped.name.split(' ').slice(0, 5).join(' ')
        }!** \n ${this.client.emotes.get("supremeblank")}${this.client.emotes.get("supremelink")} Gitub: [Follow Me](https://diwasatreya.tech/github)`)
  .setColor(`#FFFFFF`);

      int.reply({
        embeds: [done],
        ephemeral: false,
      });
    }
  }
};
