const Discord = require('discord.js');
const Lista = require('./src/lista.js');

const config = require('./config.json');

const client = new Discord.Client();

let listas = new Array();

client.once('ready', () => {
    console.log('Ready!');
    let lista = new Lista(0, '19:00', 'CS:GO')
    listas.push(lista)
});

client.login(config.token);

client.on('message', message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	if(message.content.startsWith(`${config.prefix}listas`)){
        message.channel.send(mostrarListas())
    } else if(message.content.startsWith(`${config.prefix}criar`)) {
        tratarMensagemNovaLista(message.content)
        message.channel.send('Lista criada com sucesso!')
    } else if(message.content.startsWith(`${config.prefix}deletar`)) {
        var args = message.content.slice(config.prefix.length).trim().split(' ');
        deletarLista(args[1])
        message.channel.send('Deletado com sucesso!')
    } else if (message.content.startsWith(`${config.prefix}detalhar`)) {
        var args = message.content.slice(config.prefix.length).trim().split(' ');
        message.channel.send(mostrarDetalhes(parseInt(args[1])))
    } else if (message.content.startsWith(`${config.prefix}entrar`)) {
        var args = message.content.slice(config.prefix.length).trim().split(' ');
        adicionarJogador(parseInt(args[1]), message.author.username)
        message.channel.send('Jogador adicionado!')
    } else if (message.content.startsWith(`${config.prefix}deixar`)) {
        var args = message.content.slice(config.prefix.length).trim().split(' ');
        removerJogador(parseInt(args[1]), message.author.username)
        message.channel.send('Jogador removido!')
    }
});

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

function mostrarListas() {
    let message = '';
    if(listas.length > 0) {
        listas.forEach((el) => {
            message += `#${el.id} - ${el.jogo} - ${el.hora} - ${el.listaJogadores.length}/12\n`
        })
    } else {
        message = 'Nao tem listas cadastradas ainda.'
    }

    return message;
}

function deletarLista(args) {
    if(args == 'all') {
        listas = []
    } else {
        listas = listas.filter(x => x.id == parseInt(args))
    }
}

function mostrarDetalhes(args) {
    let lista =  listas.filter(x => x.id == args)[0]
    let message = `#${lista.id} - ${lista.jogo} - ${lista.hora} - ${lista.listaJogadores.length}/12\n`
    if(lista.listaJogadores.length > 0) {
        lista.listaJogadores.forEach(nomeJogador => {
            message += `-> ${nomeJogador}\n`
        })
    } else {
        message += `nao tem jogadores`
    }
    return message
}

function adicionarJogador(lista_id, nome_jogador) {
    listas.filter(x => x.id == lista_id)[0].adicionarJogador(nome_jogador)
}

function removerJogador(lista_id, nome_jogador) {
    listas.filter(x => x.id == lista_id)[0].removerJogador(nome_jogador)
}
