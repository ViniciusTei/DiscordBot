const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    if(args.length != 10 )
        return message.channel.send(`Numero de jogadores invalido, digite apenas 10 nomes`)

    return message.channel.send(createTeams(args))
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