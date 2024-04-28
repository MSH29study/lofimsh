const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType } = require('@discordjs/voice');
const play = require('play-dl');

require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
    ]
});

const videoUrl = 'https://www.youtube.com/watch?v=eXp4Mt1S8Lg&list=PLcetZ6gSk96-FECmH9l7Vlx5VDigvgZpt&index=2';

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    const guild = client.guilds.cache.get('1157418594649522268');
    const voiceChannel = guild.channels.cache.get('1229892286691938365'); 

    if (voiceChannel) {
        try {
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: guild.id,
                adapterCreator: guild.voiceAdapterCreator,
            });

            const ytStream = await play.stream(videoUrl);
            const audioResource = createAudioResource(ytStream.stream, {
                inputType: ytStream.type,
                inlineVolume: true
            });
            const player = createAudioPlayer();

            connection.subscribe(player);
            player.play(audioResource);

            console.log(`Playing: ${videoUrl}`);

            setTimeout(() => {
                player.stop();
                console.log('Playback finished.');
            }, ytStream.video_details.durationInSec * 1000);

        } catch (error) {
            console.error('Error connecting or playing:', error);
        }
    }
});

client.login(process.env.TOKEN);
