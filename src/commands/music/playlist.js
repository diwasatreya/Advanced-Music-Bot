const {MessageEmbed, MessageButton} = require('discord.js');
const paginationEmbed = require("../../utils/Pagination");
const users = require("../../models/Users")

module.exports = class Fav extends Interaction {
    constructor() {
        super({
            name: "playlist",
            description: "Save your favourite song in your own custom playlist",
            options: [
                {
                    type: "1",
                    name: "add",
                    description: "Add the current playing song to your playlist",
                },
                {
                    type: "1",
                    name: "remove",
                    description: "Remove a song from your playlist",
                    options: [
                        {
                            type: "3",
                            name: "song",
                            description: "Song position number to remove it",
                            required: true,
                        },
                    ]
                },
                {
                    type: "1",
                    name: "list",
                    description: "Your playlist songs list",
                },
                {
                    type: "1",
                    name: "play",
                    description: "Play one of your playlist songs",
                    options: [
                        {
                            type: "4",
                            name: "song",
                            description: "Song postion number to add in queue",
                            required: true,
                        },
                    ]
                },
            ],
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

const salready = new MessageEmbed() .setDescription(`${this.client.emotes.get("supremeheart")} **This song is already in your playlist!** \n ${this.client.emotes.get("supremeblank")}${this.client.emotes.get("supremedot")} Use: \`/search\` to search a music.`)
  .setColor(`#FFFFFF`);

      const snot = new MessageEmbed() .setDescription(`${this.client.emotes.get("supremeserror")} **This song is not in your playlist!** \n ${this.client.emotes.get("supremeblank")}${this.client.emotes.get("supremedot")} Use: \`/search\` to search a music.`)
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
      
      
        await int.deferReply()
        const cmd = int.options.getSubcommand()

        let user = await users.findOne({
            _id: int.user.id,
        });

        if(!user) {
            user = new users({
                _id: int.user.id,
                savedSongs: [],
            });
        }

        if(cmd === "add") {
            let hasQueue = this.client.player.hasQueue(int.guild.id);
            if (!hasQueue) {
                return int.editReply({
                    embeds: [nomusic],
                    ephemeral: false,
                });
            }

            let queue = this.client.player.getQueue(int.guild.id);

            let song = queue.nowPlaying;
            if (!song) {
                return int.editReply({
                     embeds: [nomusic],
                    ephemeral: false,
                });
            }

            let old = user.savedSongs.find((s) => s.name === song.name);

            if (old) {
                return int.editReply({
                    embeds: [salready],
                    ephemeral: false,
                });
            }

            user.savedSongs.push({name: song.name, url: song.url});
            await user.save();

const sadded = new MessageEmbed() .setDescription(`${this.client.emotes.get("supremeadd")} **Added __${song.name.split(' ').slice(0, 5).join(' ')}__ in your playlist!** \n ${this.client.emotes.get("supremeblank")}${this.client.emotes.get("supremedot")} Use: \`/playlist play\` <number> to play your playlist song.`)
  .setColor(`#FFFFFF`);
          
            return int.editReply({
                embeds: [sadded],
                ephemeral: false,
            });
        }
        if (cmd === "remove") {
            let index = int.options._hoistedOptions[0].value;

            let old = user.savedSongs.find((s, i) => i === index - 1);

const noplay = new MessageEmbed() .setDescription(`${this.client.emotes.get("supremeserror")} **This song is not in your playlist!** \n ${this.client.emotes.get("supremeblank")}${this.client.emotes.get("supremedot")} Developer: [Supreme#2401](https://discord.gg/whJeF4mDAX).`)
  .setColor(`#FFFFFF`);
          
            if (!old)
                return int.editReply({
                    embeds: [noplay],
                    ephemeral: false,
                });

            user.savedSongs.splice(index - 1, 1);
            await user.save();


const sremoved = new MessageEmbed() .setDescription(`${this.client.emotes.get("supremeremove")} **Removed __${old.name.split(' ').slice(0, 5).join(' ')}__ from your playlist!** \n ${this.client.emotes.get("supremeblank")}${this.client.emotes.get("supremedot")} Developer: [Supreme#2401](https://discord.gg/whJeF4mDAX).`)
  .setColor(`#FFFFFF`);
          
            return int.editReply({
                embeds: [sremoved],
                    ephemeral: false,
            });
        }

        if (cmd === "list") {
            let sng = user.savedSongs;

            if (!sng.length)
                return int.editReply({
                    content: "You don't have any songs in playlist!",
                    ephemeral: true,
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

          

            let currentEmbedItems = [];
            let embedItemArray = [];
            let pages = [];

            let buttonList = [btn1, btn2];

            if (sng.length > 10) {
                sng.forEach((s, i) => {
                    s.index = i + 1;
                        if (currentEmbedItems.length < 10) currentEmbedItems.push(s);
                        else {
                            embedItemArray.push(currentEmbedItems);
                            currentEmbedItems = [s];
                        }
                });

                embedItemArray.push(currentEmbedItems);

                embedItemArray.forEach((x) => {

                    let emb = new MessageEmbed()
                        .setTitle(`${int.user.username} Playlist Songs`)
                        .setThumbnail(int.user.displayAvatarURL({ size: 2048, dynamic: true }))
                        .setColor("#FFFFFF")
                        .setDescription(`${x.map((s) => `[${s.index}. ${s.name}](${s.url})`).join("\n")}`)
                        .setTimestamp();

                    pages.push(emb);
                });

                await paginationEmbed(int, pages, buttonList);
            } else {

                let emb = new MessageEmbed()
                    .setTitle(`${int.user.username} Playlist Songs`)
                    .setThumbnail(int.user.displayAvatarURL({ size: 2048, dynamic: true }))
                    .setColor("#FFFFFF")
                    .setDescription(`${sng.map((s, i) => `[${i +1}. ${s.name}](${s.url})`).join("\n")}`)
                    .setTimestamp();

                return int.editReply({ embeds: [emb] });
            }
        }

        if(cmd === "play") {

            let index = int.options._hoistedOptions[0].value;


                let sng = user.savedSongs.find((s, i)  => i + 1 === Number(index));
                if(!sng)
                    return int.editReply({
                        embeds:[snot],
                        ephemeral: false,
                    });

const done = new MessageEmbed() .setDescription(`${this.client.emotes.get("supremeplay")} **Playing __${sng.name.split(' ').slice(0, 5).join(' ')}__!** \n ${this.client.emotes.get("supremeblank")}${this.client.emotes.get("supremedot")} Developer: [Supreme#2401](https://discord.gg/whJeF4mDAX).`)
  .setColor(`#FFFFFF`);
          
                await int.editReply({
                    embeds: [done],
                    ephemeral: true,
                });

                return this.client.play(this.client, int, data, sng.url, "youtube", false, true, false, false);

        }
    }
};
