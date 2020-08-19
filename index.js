const Discord = require('discord.js');
const fs = require("fs");
const admin = require('firebase-admin');

const Lista = require('./src/lista.js');
const config = require('./config.json');

const client = new Discord.Client();

var serviceAccount = require("./discordbot-dffbc-firebase-adminsdk-ay2f4-6cd39b97cc.json") || process.env.FIREBASE;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://discordbot-dffbc.firebaseio.com'
  });
//bot ready
client.once('ready', async () => {
    console.log('Ready!');
    
});

//load commands
client.commands = new Discord.Collection();
fs.readdir('./src/commands/', (err, files) => {
    if(err) console.error(err); 

    if(files.length < 0) return;

    files.forEach((file, index) =>{
        //check if the file is a javascript file
        if(!file.endsWith('.js')) return;

        const event = require(`./src/commands/${file}`)
        client.commands.set(event.help.name, event)
    })
});

//bot messages
client.on('message', message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;
    
    //variables
    let messageArray = message.content.split(" ");
    let command = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);

    let cmd = client.commands.get(command.slice(config.prefix.length))
    if (cmd) cmd.run(client, message, args);

    // old commands
	// if(message.content.startsWith(`${config.prefix}listas`)){
    //     message.channel.send(mostrarListas())
    // } else if(message.content.startsWith(`${config.prefix}criar`)) {
    //     tratarMensagemNovaLista(message.content)
    //     message.channel.send('Lista criada com sucesso!')
    // } else if(message.content.startsWith(`${config.prefix}deletar`)) {
    //     var args = message.content.slice(config.prefix.length).trim().split(' ');
    //     deletarLista(args[1])
    //     message.channel.send('Deletado com sucesso!')
    // } else if (message.content.startsWith(`${config.prefix}detalhar`)) {
    //     var args = message.content.slice(config.prefix.length).trim().split(' ');
    //     message.channel.send(mostrarDetalhes(parseInt(args[1])))
    // } else if (message.content.startsWith(`${config.prefix}entrar`)) {
    //     var args = message.content.slice(config.prefix.length).trim().split(' ');
    //     adicionarJogador(parseInt(args[1]), message.author.username)
    //     message.channel.send('Jogador adicionado!')
    // } else if (message.content.startsWith(`${config.prefix}deixar`)) {
    //     var args = message.content.slice(config.prefix.length).trim().split(' ');
    //     removerJogador(parseInt(args[1]), message.author.username)
    //     message.channel.send('Jogador removido!')
    // }
});

client.login(process.env.BOT_TOKEN || config.token);

function tratarMensagemNovaLista(message) {
    let args = message.split(' ');
    let jogo = args[1]
    let hora = args[2]

    criarLista(hora, jogo)
}

function criarLista(hora, jogo) {
    let novo_id = listas.length;
    let nova_lista = new Lista(novo_id, hora, jogo)

    listas.push(nova_lista)
}



function deletarLista(args) {
    if(args == 'all') {
        listas = []
    } else {
        listas = listas.filter(x => x.id == parseInt(args))
    }
}

function adicionarJogador(lista_id, nome_jogador) {
    listas.filter(x => x.id == lista_id)[0].adicionarJogador(nome_jogador)
}

function removerJogador(lista_id, nome_jogador) {
    listas.filter(x => x.id == lista_id)[0].removerJogador(nome_jogador)
}
