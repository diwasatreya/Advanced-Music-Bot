const { MessageEmbed } = require('discord.js');

module.exports = class Play extends Interaction {
  constructor() {
    super({
      name: "lofi",
      description: "Play a lo-fi songs",
      options: [
        {
          type: "3",
          name: "types",
          description: "Choose language/type",
          required: true,
          choices: [
            {
              name: "Hindi",
              value: "hindi",
            },
            {
              name: "Nepali",
              value: "nepali",
            },
            {
              name: "English",
              value: "english",
            },
          ],
        },
        {
          type: "5",
          name: "force",
          description: "Ignore other song and play song now!",
          required: false,
        },
      ],
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

let buttonList = [btn1, btn2];
const row = new MessageActionRow().addComponents(buttonList);

const lhindi = [  "hindi lo-fi songs to study/sleep/chill/relax make your day better",
   "hindi lofi songs",
"hindi lo-fi songs to study/sleep/chill/relax make your day better ",
"hindi lofi songs to study/sleep/chill/relax",
"hindi lofi songs remix",
"hindi lofi songs for sleeping",
"hindi lofi songs mashup",
"hindi lofi songs sad",
"hindi lofi song 2022",
"hindi lofi song all",
"hindi lofi song arijit singh",
"hindi lofi songs best",
"hindi lofi songs bollywood",
"hindi lofi songs bass",
"hindi lofi songs chill",
"hindi lofi song no copyright" ]

    const lnepali = [
      "nepali lofi song",
"nepali lofi song 2021",
"nepali lofi song chill mix",
"nepali lofi song remix",
"nepali lofi song 2022",
"nepali love song lyrics",
"nepali lofi song slowed reverb",
"lofi beats nepali song",
"nepali lofi song collection slowed and reverb",
"nepali lofi sad songs collection",
"nepali lofi song 1 hour",
"nepali love song lofi",
"nepali song mashup lofi",
"new nepali lofi song 2022",
"nepali lofi song playlist"
      
    ]


    const lenglish = [
          "english lofi songs",
    "english lofi remix songs",
    "english lofi sad songs",
    "english lofi songs playlist",
    "english lofi songs for studying",
    "english lofi beats",
    "english lofi bass boosted",
    "english love background music",
    "english chill lofi songs",
    "english lofi for study",
    "english lofi for coding",
    "lofi english songs justin bieber",
    "lofi english songs 2021",
    "lofi english songs ed sheeran",
    "english hindi sad song lofi",
    "live english lo-fi song",
    "best english lo-fi songs 2022"
    ]
    
     let phindi = lhindi[Math.floor(Math.random() * lhindi.length)];

    let pnepali = lnepali[Math.floor(Math.random() * lnepali.length)];

    let penglish = lenglish[Math.floor(Math.random() * lenglish.length)];
    
const types = int.options.getString("types");
 
let song;
if (types === "hindi") {

  

  song = phindi;

} else if (types == "nepali")
{
  song = pnepali;
}
    else if (types == "english")
    {
      song = penglish;
    }

    
    const force = int.options.getBoolean("force");

    let channel = int.member.voice.channel;

const novc = new MessageEmbed() .setDescription(`${this.client.emotes.get("supremenomusic")} **You should be in a voice channel!** \n ${this.client.emotes.get("supremeblank")}${this.client.emotes.get("supremedot")} Developer: [Atreya#2401](https://aromaxdev.xyz/github)`)
  .setColor(`#FFFFFF`);

      const novcs = new MessageEmbed() .setDescription(`${this.client.emotes.get("supremenomusic")} **You should be in a my voice channel!** \n ${this.client.emotes.get("supremeblank")}${this.client.emotes.get("supremedot")} Developer: [Atreya#2401](https://aromaxdev.xyz/github)`)
  .setColor(`#FFFFFF`);

      const nodj = new MessageEmbed() .setDescription(`${this.client.emotes.get("supremedj")} **You should be a DJ or Alone in Voice Channel!** \n ${this.client.emotes.get("supremeblank")}${this.client.emotes.get("supremedot")} Developer: [Atreya#2401](https://aromaxdev.xyz/github)`)
  .setColor(`#FFFFFF`);
      
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

    let isDJ = data.djRoles.some((r) => int.member._roles.includes(r));
    let isAllowed = data.voiceChannels.find((c) => c === channel.id);
    let members = channel.members.filter((m) => !m.user.bot);

    if (data.voiceChannels.length > 0 && !isAllowed) {
      return int.reply({
        content: `${this.client.emotes.get(
          "supremenomusic"
        )} | You should be in one of the allowed voice channels!`,
        ephemeral: true,
      });
    }

    if (
      force &&
      members.size > 1 &&
      !isDJ &&
      !int.member.permissions.has("MANAGE_GUILD")
    ) {
      return int.reply({
        embeds:
          [nodj],
        ephemeral: false,
      });
    }

    // Spotify regex
    const spotifyTrackRegex =
      /^(https?:\/\/)?(www\.)?(open\.spotify\.com\/track\/)(.*)$/;
    const spotifyPlaylistRegex =
      /^(https?:\/\/)?(www\.)?(open\.spotify\.com)\/playlist\/(.*)$/;
    const spotifyAlbumRegex =
      /^(?:https?:\/\/)?open\.spotify\.com\/album\/([a-zA-Z0-9]{22})(?:\S+)?/;

    // Apple Music regex
    const appleMusicPlaylistRegex =
      /^(https?:\/\/)?(www\.)?(music\.apple\.com)\/(.*)\/playlists\/(.*)$/;
    const appleMusicAlbumRegex =
      /^(https?:\/\/)?(www\.)?(music\.apple\.com)\/(.*)\/album\/(.*)$/;
    const appleMusicTrackRegex =
      /^(https?:\/\/)?(www\.)?(music\.apple\.com)\/(.*)\/(.*)\/(.*)$/;

    // youtube regex
    const youtubePlaylistRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/playlist\?list=(.*)$/;
    const youtubeVideoRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/watch\?v=(.*)$/;

    // YouTube's music regex
    const youtubeMusicAlbumRegex =
      /^(https?:\/\/)?(music\.youtube\.com)\/playlist\?list=(.*)$/;
    const youtubeMusicTrackRegex =
      /^(https?:\/\/)?(music\.youtube\.com)\/watch\?v=(.*)$/;

    const isPlaylist =
      youtubePlaylistRegex.test(song) ||
      youtubeMusicAlbumRegex.test(song) ||
      spotifyPlaylistRegex.test(song) ||
      spotifyAlbumRegex.test(song) ||
      appleMusicPlaylistRegex.test(song) ||
      appleMusicAlbumRegex.test(song);

    let source;
    if (
      spotifyTrackRegex.test(song) ||
      spotifyAlbumRegex.test(song) ||
      spotifyPlaylistRegex.test(song)
    ) {
      source = "supremespotify";
    } else if (
      appleMusicTrackRegex.test(song) ||
      appleMusicAlbumRegex.test(song) ||
      appleMusicPlaylistRegex.test(song)
    ) {
      source = "supremeapple";
    } else if (
      youtubeVideoRegex.test(song) ||
      youtubePlaylistRegex.test(song)
    ) {
      source = "supremeblank";
    } else if (
      youtubeMusicTrackRegex.test(song) ||
      youtubeMusicAlbumRegex.test(song)
    ) {
      source = "supremeblank";
    } else {
      source = "supremeblank";
    }

    if (isPlaylist) {
      return this.client.play(
        this.client,
        int,
        data,
        song,
        source,
        true,
        false,
        false,
        false
      );
    } else {
      return this.client.play(
        this.client,
        int,
        data,
        song,
        source,
        false,
        false,
        false,
        force
      );
    }
  }
};
