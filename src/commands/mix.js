const Discord = require('discord.js');
const admin = require('firebase-admin');

const db = admin.firestore();

module.exports.run = async (client, message, args) => {
    if(args.length != 10 && args.length != 1)
        return message.channel.send(`Numero de jogadores invalido, digite 10 nomes ou o numero de uma lista`)

    if(args.length == 1) {
        if(!isNaN(args[0])) {
            const response = await db.collection('listas').where('id', '==', args[0]).get();
            if(response._size == 0) {
                return message.channel.send('Nao ha listas com esse numero')
            } else {
                response.forEach(doc => {
                    let d = doc.data()
                    let jogadores = d.jogadores
                    if(jogadores.length < 10) {
                        return message.channel.send('Numero de jogadores insuficiente!')
                    } else {
                        return message.channel.send(createTeams(jogadores))
                    }
                })
            }
            
        }
    } else {
        return message.channel.send(createTeams(args))
    }
}

module.exports.help = {
    name: 'mix'
}

function createTeams(args) {
    let titulo = '----- Time 1 -----\n'
    let titulo2 = '----- Time 2 -----\n'
    let time1 = ''
    let time2 = ''
    
    args = shuffle(args);

    args.forEach((element, index) => {
        if(index < 5) {
            time1 +=  `${index + 1} - ${element}\n`
        } else {
            time2 +=  `${index + 1} - ${element}\n`
        }
    });

    return titulo + time1 + titulo2 + time2
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }