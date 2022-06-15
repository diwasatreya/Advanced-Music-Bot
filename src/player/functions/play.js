const { MessageEmbed } = require("discord.js")
module.exports = async function play(
    client,
    int,
    data,
    input,
    source = `supremeblank`,
    playlist = false,
    search = false,
    last = false,
    force = false
) {

    let guildQueue = client.player.hasQueue(int.guild.id);
    let queue;

    if (!guildQueue) {
        queue = client.player.createQueue(int.guild.id);
        queue.skipVotes = [];
    } else {
        queue = client.player.getQueue(int.guild.id);
    }

    let channel = int.member.voice.channel;

    await queue.join(channel).catch((err) => {


const nojoin = new MessageEmbed() .setDescription(`${client.emotes.get("supremenomusic")} ** I Couldn't Join The Voice Channel!** \n ${client.emotes.get("supremeblank")}${client.emotes.get("supremelink")} Support: [Server](https://aromaxdev.xyz/discord)`)
  .setColor(`#FFFFFF`);
      
        if (search) {
            return int.editReply({
                embeds: [nojoin],
            });
        } else {
            return int.reply({
                embeds: [nojoin],
                ephemeral: false,
            });
        }
    });

    if (!search && !last) {
        int.reply(
            `${client.emotes.get("supremesearch")} Searching \`${input}\` ${client.emotes.get(`${source}`)}`
        );
    }

    queue.textChannel = int.channel;

    if (playlist) {
        let pl = await queue
            .playlist(input, {requestedBy: int.user})
            .catch((_, err) => {
                if (err) {
                    console.log(err);
                }
                if (!queue) {
                    queue.stop();
                }
            });
const noplayl = new MessageEmbed() .setDescription(`${client.emotes.get("supremeno")} ** I couldn't found that playlist!** \n ${client.emotes.get("supremeblank")}${client.emotes.get("supremelink")} Support: [Server](https://aromaxdev.xyz/discord)`)
  .setColor(`#FFFFFF`);
      
        if (!pl) return int.channel.send({
              embeds:[noplayl],
            });
    } else {
        if (force) {
            let song = await queue
                .play(input, {index: 0, requestedBy: int.user})
                .catch((_, err) => {
                    if (err) {
                        console.log(err);
                    }
                    if (!queue) {
                        queue.stop();
                    }
                });

          const nosongg = new MessageEmbed() .setDescription(`${client.emotes.get("supremeno")} ** I couldn't found that song!** \n ${client.emotes.get("supremeblank")}${client.emotes.get("supremelink")} Support: [Join Server](https://aromaxdev.xyz/discord)`)
  .setColor(`#FFFFFF`);
            if (!song) return int.channel.send({
              embeds:[nosongg],
            });
            queue.skip()
        } else {
            let song = await queue.play(input, {requestedBy: int.user}).catch((_, err) => {
                if (err) {
                    console.log(err);
                }
                if (!queue) {
                    queue.stop();
                }
            });
          const nosonggg = new MessageEmbed() .setDescription(`${client.emotes.get("supremeno")} ** I couldn't found that song!** \n ${client.emotes.get("supremeblank")}${client.emotes.get("supremelink")} Support: [Join Server](https://aromaxdev.xyz/discord)`)
  .setColor(`#FFFFFF`);
            if (!song) return int.channel.send({
              embeds:[nosonggg],
            });
        }

    }
};
