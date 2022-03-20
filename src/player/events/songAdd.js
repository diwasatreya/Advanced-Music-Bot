const {msToSeconds} = require("../../utils/Utils");
const sf = require("seconds-formater");
const {MessageEmbed} = require("discord.js");
const { Canvas, resolveImage } = require('canvas-constructor');
const canvas = require('canvas')
const { registerFont } = require('canvas');
registerFont("./src/fonts/Open Sans.ttf", { family: 'Open Sans' });
registerFont('./src/fonts/Montserrat.ttf', { family: 'Ope' });
const { MessageAttachment } = require("discord.js")
module.exports = class SongAdd extends Event {
    constructor() {
        super({
            name: "songAdd",
            once: false,
        });
    }

    async exec(queue, song) {
        let channel = queue.textChannel;
        let user = song.requestedBy;

        if (channel) {
            let timeLeft;
            if (queue.nowPlaying.name !== song.name) {
                let estimated = 0;
                queue.songs.forEach((s) => {
                    if (s.name !== song.name) {
                        estimated += s.milliseconds;
                    }
                });

                let stream = queue.nowPlaying.isLive
                    ? 0
                    : queue.connection.player._state.resource.playbackDuration;
                let seconds = msToSeconds(estimated - stream);


                if (seconds === 86400) {
                    timeLeft = sf.convert(seconds).format("D day");
                } else if (seconds >= 3600) {
                    timeLeft = sf.convert(seconds).format("H:MM:SS");
                } else {
                    timeLeft = sf.convert(seconds).format("M:SS");
                }
            } else {
                timeLeft = "Now";
            }


            let emb;
            if(queue.songs.indexOf(song) === 1 && queue.songs.length > 2) {

              let namees = song.name.split(' ').slice(0, 5).join(` `);
          const imge = await canvas.loadImage('./src/ipploplayer.png');

   const imgge = await canvas.loadImage(song.thumbnail);

    let imagee = new Canvas(605, 190)
    .printImage(imge, 0, 0, 605, 190)
    .setColor("#000000")
      .setTextFont('16px Open Sans')
      .setTextAlign("center")
    .printWrappedText(namees, 360, 43)
      .setTextFont('14px Ope')
      .printWrappedText(song.author, 360, 63)
    .printRectangle(47, 28,150, 90)
    .printImage(imgge, 47, 28,150, 90)
      .setTextFont('20px Ope')
      .printWrappedText(song.duration, 541, 168)
    // .setColor("#000000")
    .toBuffer();
emb = new MessageAttachment(imagee, 'supreme-ipplo.png');
              
                // emb = new MessageEmbed()
                //     .setAuthor(
                //         ` ${user.username} `,
                //         user.displayAvatarURL({dynamic: true})
                //     )
                //     .setTitle(`${song.name}`)
                //     .setURL(`${song.url}`)
                //     .setColor("#2f3136")
                //     .setThumbnail(song.thumbnail)
                //   .setImage(aaa)
                //     .addFields(
                //         {
                //             name: "Author",
                //             value: song.author,
                //             inline: true,
                //         },
                //         {
                //             name: "Duration",
                //             value: song.isLive ? "Live" : song.duration,
                //             inline: true,
                //         },
                //         {
                //             name: "Estimated time",
                //             value: `Now`,
                //             inline: true
                //         },
                //     )
            } else {



 let namee = song.name.split(' ').slice(0, 5).join(` `);
          const img = await canvas.loadImage('./src/ipploplayer.png');

   const imgg = await canvas.loadImage(song.thumbnail);

    let image = new Canvas(605, 190)
    .printImage(img, 0, 0, 605, 190)
    .setColor("#000000")
      .setTextFont('16px Open Sans')
      .setTextAlign("center")
    .printWrappedText(namee, 360, 43)
      .setTextFont('14px Ope')
      .printWrappedText(song.author, 360, 63)
    .printRectangle(47, 28,150, 90)
    .printImage(imgg, 47, 28,150, 90)
      .setTextFont('20px Ope')
      .printWrappedText(song.duration, 541, 168)
    // .setColor("#000000")
    .toBuffer();
emb = new MessageAttachment(image, 'supreme-ipplo.png');
              
                // emb = new MessageEmbed()
                //     .setAuthor(
                //         ` ${user.username} `,
                //         user.displayAvatarURL({dynamic: true})
                //     )
                //     .setTitle(`${song.name}`)
                //     .setURL(`${song.url}`)
                //     .setColor("#2f3136")
                //     .setThumbnail(song.thumbnail)
                
                //     .addFields(
                //         {
                //             name: "Author",
                //             value: song.author,
                //             inline: true,
                //         },
                //         {
                //             name: "Duration",
                //             value: song.isLive ? "Live" : song.duration,
                //             inline: true,
                //         },
                //         {
                //             name: "Estimated time",
                //             value: `${timeLeft}`,
                //             inline: true
                //         },
                //     )

                if ((queue.songs.length - 1) !== 0) {
                  let namee = song.name.split(' ').slice(0, 5).join(` `);
          const img = await canvas.loadImage('./src/ipploplayerq.png');
                    const imgg = await canvas.loadImage(song.thumbnail);

    let image = new Canvas(605, 190)
    .printImage(img, 0, 0, 605, 190)
    .setColor("#000000")
      .setTextFont('16px Open Sans')
      .setTextAlign("center")
    .printWrappedText(namee, 360, 43)
      .setTextFont('14px Ope')
      .printWrappedText(song.author, 360, 63)
    .printRectangle(47, 28,150, 90)
    .printImage(imgg, 47, 28,150, 90)
      .setTextFont('20px Ope')
      .printWrappedText(song.duration, 541, 168)
    // .setColor("#000000")
    .toBuffer();
emb = new MessageAttachment(image, 'supreme-ipplo.png');
                }
            }

          
            channel.send({ files: [emb] });
        }
    }
};
