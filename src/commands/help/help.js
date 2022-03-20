const { RepeatMode } = require("discord-music-player");
const { MessageActionRow, MessageEmbed, MessageButton } = require("discord.js");
module.exports = class Loop extends Interaction {
  constructor() {
    super({
      name: "help",
      description: "See commands of bot",
      options: [
        {
          type: "3",
          name: "category",
          description: "Choose which category",
          required: true,
          choices: [
            {
              name: "Music",
              value: "music",
            },
            {
              name: "Info",
              value: "info",
            },
          ],
        },
      ],
    });
  }

  async exec(int, data) {

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


    let btn3 = new MessageButton()
      .setCustomId("playbtn")
      .setLabel("Play")
        .setEmoji(`954345581013250048`)
      .setStyle("SECONDARY")
    .setDisabled(true);

    const btn4 = new MessageButton()
      .setCustomId("stopbtn")
      .setLabel("Stop")
        .setEmoji(`954345379414028288`)
      .setStyle("SECONDARY")
    .setDisabled(true);
      

    let buttonList = [btn1, btn2];

    let buttonss = [btn3, btn4, btn1, btn2]
    

     const row = new MessageActionRow().addComponents(buttonList);

    const bmusic = new MessageActionRow().addComponents(buttonss);
    

      const music = new MessageEmbed()
        .setDescription(`${this.client.emotes.get("suprememusic")} __**Music Commands**__ \n
${this.client.emotes.get("supremedot")} \`/dj        :\` Modify your server DJ role. \n${this.client.emotes.get("supremedot")} \`/last      :\` Add a song previously finished in queue. \n${this.client.emotes.get("supremedot")} \`/lofi      :\` Play a lo-fi music. \n${this.client.emotes.get("supremedot")} \`/loop      :\` Enable.Disable loop for queue/song. \n${this.client.emotes.get("supremedot")} \`/nowplaying:\` Shows the current playing song info. \n${this.client.emotes.get("supremedot")} \`/pause     :\` Pause the current playing song. \n${this.client.emotes.get("supremedot")} \`/play      :\` Play/Add a song in VC/queue. \n${this.client.emotes.get("supremedot")} \`/playlist  :\` Modify your own playlist. \n${this.client.emotes.get("supremedot")} \`/queue     :\` Shows the songs playing next. \n${this.client.emotes.get("supremedot")} \`/replay    :\` Play a song again from starting. \n${this.client.emotes.get("supremedot")} \`/resume    :\` Continue playing paused song. \n${this.client.emotes.get("supremedot")} \`/search    :\` Find your exact song. \n${this.client.emotes.get("supremedot")} \`/shuffle   :\` Randomize all the songs in queue. \n${this.client.emotes.get("supremedot")} \`/skip      :\` Skips the song. \n${this.client.emotes.get("supremedot")} \`/skipto    :\` Skips all the songs upto your choice \n${this.client.emotes.get("supremedot")} \`/volume    :\` Change the volume percentages. \n ${this.client.emotes.get("supremedot")} \`/stop      :\` Stops all the songs and leaves the VC.`)
    .setFooter(`Any Kind of help needed? Join our server`)


    const info = new MessageEmbed() 
      .setTitle(`${this.client.user.username} Info Commands`)
   .setDescription(`
${this.client.emotes.get("supremedot")} \`/help      :\` Shows the category commands.`)
  .setColor(`#FFFFFF`);
      
    const category = int.options.getString("category");


    if (category === "music") {

 return int.reply({
        embeds: [music],
   // components: [bmusic],
        ephemeral: false,
      });
      
    } else if (category === "info") {

 return int.reply({
        embeds: [info],
   // components: [row],
        ephemeral: false,
      });
      
    }
  }
};
