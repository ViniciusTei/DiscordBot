const ytdl = require('ytdl-core');
const puppeteer = require('puppeteer');

module.exports.run = async (client, message, args) => {
	const voiceChannel = message.member.voice.channel;

	if (!voiceChannel) {
		return message.reply('please join a voice channel first!');
	}

	voiceChannel.join().then(async connection => {
		scrap(args[0]).then((valores) => {
			const stream = ytdl(valores[0].url, { filter: 'audioonly' });
	
			const dispatcher = connection.play(stream);
		
			tocandoMusica(message, dispatcher, valores[0])
		})
		
	})
}

/**
 * Essa funcao usa o pupteer para pesquisar videos no youtube e retornar o titulo e a url
 *  
 */
async function scrap(searchParam) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
  
	await page.goto('https://www.youtube.com/results?search_query=' + searchParam);
	const result = await page.evaluate(() => {
		let elements = []
		document.querySelectorAll('#video-title').forEach(el => {
		  elements.push({title: el.getAttribute('title'), url: `https://www.youtube.com` + el.getAttribute('href')})
		  console.log(el)
		})
		return elements
	})
	await browser.close();
	return result
  }

async function tocandoMusica(message, dispatcher, musica) {
	await message.channel.send(`Tocando musica: ${musica.title}\nComandos para musica: !play !pause !stop`).then((msg) => {
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
