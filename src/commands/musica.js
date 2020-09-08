const ytdl = require('ytdl-core');

module.exports.run = async (client, message, args) => {
    if (message.content === '!musica') {
		if (message.channel.type === 'dm') return;

		const voiceChannel = message.member.voice.channel;

		if (!voiceChannel) {
			return message.reply('please join a voice channel first!');
		}

		voiceChannel.join().then(async connection => {
			const stream = ytdl('https://www.youtube.com/watch?v=Q0oIoR9mLwc', { filter: 'audioonly' });
		
			const dispatcher = connection.play(stream);
			
			tocandoMusica(message, dispatcher)
		})
	}
}

async function tocandoMusica(message, dispatcher) {
	await message.channel.send('Comandos para musica: !play !pause !stop').then((msg) => {
		message.channel.awaitMessages(musicArgutmets(msg), {max: 1, time: 100000, errors: ['time']})
			.then(collected => {
				collected.forEach(element => {
					if(element.content == '!pause') {
						dispatcher.pause()
						tocandoMusica(message, dispatcher)
					} else if(element.content == '!play') {
						dispatcher.resume()
						tocandoMusica(message, dispatcher)
					} else if(element.content == '!stop') {
						dispatcher.destroy()
					}
					
				});
			})
	})
}

function musicArgutmets(arg) {
	const correctArgumets = ['!play', '!pause', '!stop']
	const filter = arg => {
		return correctArgumets.some(x => x.toLowerCase() === arg.content.toLowerCase());
	};
	
	return filter
}

module.exports.help = {
    name: 'musica'
}
