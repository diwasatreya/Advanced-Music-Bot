const { MessageEmbed } = require("discord.js")
module.exports = class Pause extends Interaction {
  constructor() {
    super({
      name: "invite",
      description: "Get the links",
    });
  }

  async exec(int, data) {

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


    const btn3 = new MessageButton()
      .setLabel("Youtube")
      .setStyle("LINK")
      .setEmoji(`954345443440082984`)
      .setURL(`https://diwasatreya.tech/youtube`);

    const btn4 = new MessageButton()
      .setLabel("Github")
      .setStyle("LINK")
      .setEmoji(`954351028873068615`)
      .setURL(`https://diwasatreya.tech/github`);

    let buttonList = [btn1, btn2, btn3, btn4];
    const row = new MessageActionRow().addComponents(buttonList);


    const invite = new MessageEmbed().setDescription(`${this.client.emotes.get("supremelink")} **Click the button to redirect and also follow me on github** \n ${this.client.emotes.get("supremeblank")}${this.client.emotes.get("supremedot")} Developer: [Supreme#2401](https://diwasatreya.tech/github)`)
      .setColor(`#FFFFFF`);


    return int.reply({
      embeds: [invite],
      components: [row],
      ephemeral: false,
    });


  }
};
