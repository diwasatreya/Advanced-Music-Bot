const {MessageEmbed} = require('discord.js');

module.exports = class Roles extends Interaction {
    constructor() {
        super({
            name: "dj",
            description: "Give DJ permission",
            options: [
                {
                    type: "1",
                    name: "add",
                    description: "Add a role to the DJ roles list",
                    options: [
                        {
                            type: "8",
                            name: "role",
                            description: "Add DJ Role",
                            required: true,
                        },
                    ]
                },
                {
                    type: "1",
                    name: "remove",
                    description: "Remove a role from the DJ roles list",
                    options: [
                        {
                            type: "8",
                            name: "role",
                            description: "Remove DJ Role",
                            required: true,
                        },
                    ]
                },
                {
                    type: "1",
                    name: "list",
                    description: "List of all DJ roles",
                },
            ],
        });
    }
    async exec(int, data) {
        if (!int.member.permissions.has("MANAGE_GUILD"))
            return int.reply({
                content: "You don't have the required permissions to do this!",
                ephemeral: true,
            });

        const cmd = int.options.getSubcommand()
      
        if(cmd === "add") {

            let role = int.options._hoistedOptions[0].role

            if(role.id === int.guild.id) {
                return int.reply({
                    content: "The *everyone* role is not manageable!",
                    ephemeral: true,
                });
            }
            let old = data.djRoles.find((r) => r === role.id);

            if (old) {
                return int.reply({
                    content: `The role ${role.name} is already in the list!`,
                    ephemeral: true,
                });
            }

            data.djRoles.push(role.id);
            await data.save();

const djadded = new MessageEmbed() .setDescription(`${this.client.emotes.get("supremeadd")} **Added <@&${role.id}> role to the DJ roles list!** \n ${this.client.emotes.get("supremeblank")}${this.client.emotes.get("supremedot")} Use: \`/play\` [song/url](https://diwasatreya.tech/github) to play a music.`)
  .setColor(`#FFFFFF`);
          
            return int.reply({
                embeds: [djadded],
                ephemeral: false,
            });
        }
        if (cmd === "remove") {
          let role = int.options._hoistedOptions[0].role;

          if (role.id === int.guild.id) {
            return int.reply({
              content: "Everyone role can't be in DJ role list!",
              ephemeral: true,
            });
          }

          let old = data.djRoles.find((r) => r === role.id);

          if (!old)
            return int.reply({
              content: `The role ${role.name} is not in the list!`,
              ephemeral: true,
            });

          let index = data.djRoles.indexOf(role.id);
          data.djRoles.splice(index, 1);
          await data.save();

const djremove = new MessageEmbed() .setDescription(`${this.client.emotes.get("supremeremove")} **Removed <@&${role.id}> role from the DJ roles list!** \n ${this.client.emotes.get("supremeblank")}${this.client.emotes.get("supremedot")} Tips: Any help needed? [Join our Server](https://diwasatreya.tech/discord)`)
  .setColor(`#FFFFFF`);
          
          return int.reply({
            embeds: [djremove],
            ephemeral: false,
          });
        }
        if (cmd === "list") {
          let djs = data.djRoles;

          if (!djs.length)
            return int.reply({
              content: "There are no DJ roles yet!",
              ephemeral: true,
            });

          let emb = new MessageEmbed()  // edit embed 
            .setTitle("DJ Roles list")
            .setColor("#FFFFFF")
            .setDescription(`${djs.map((m) => `<@&${m}>`).join(" ")}`)
            .setTimestamp();

          return int.reply({ embeds: [emb] }); //send embed message
        }
    }
};
