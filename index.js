const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, VoiceConnectionStatus } = require('@discordjs/voice');
const play = require('play-dl'); 
require('dotenv').config();
const express = require("express")
const app = express();

app.listen(() => console.log("I'm Ready To Work..! 24H"));
app.get('/', (req, res) => {
  res.send(`
  <body>
  <center><h1>Bot 24H ON!</h1></center
  </body>`)
});

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});
var listener = app.listen(process.env.PORT || 2000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

const channelId = '1229892286691938365';
const guildId = '1157418594649522268'; 
const Url = 'https://www.youtube.com/watch?v=eXp4Mt1S8Lg&list=PLcetZ6gSk96-FECmH9l7Vlx5VDigvgZpt&index='; 

client.on('ready', () => {
  console.log(`✅ | Logged in as ${client.user.tag}`);
  joinAndPlayPlaylist(guildId, channelId);
});

async function joinAndPlayPlaylist(guildId, channelId, message) {
  const channel = await client.channels.fetch(channelId);
  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: guildId,
    adapterCreator: channel.guild.voiceAdapterCreator,
  });

  const player = createAudioPlayer();

  for(var i = 1; i < 343 ;i++){
    const stream = await play.stream(Url+i);
    const duration = video.video_details.durationInSec;
    const resource = createAudioResource(stream.stream, { inputType: stream.type });
    player.play(resource);
    connection.subscribe(player);
    player.on(AudioPlayerStatus.Playing, () => console.log('Playing Podcast video for : '+ duration + '  \nThis is the video num : '+ i));
    setTimeout(() => { player.stop();}, duration);
    player.on('error', error => console.error(`Error: ${error.message}`));

  }
}



client.login(process.env.TOKEN);
