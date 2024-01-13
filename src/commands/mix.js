import { SlashCommandBuilder } from "discord.js"

const help = {
  data: new SlashCommandBuilder().setName('mix').setDescription('Cria um time de mix aleatóriamente.'),
  execute: async (interaction) => {
    if(args.length != 10 && args.length != 1)
      return await interaction.reply(`Numero de jogadores invalido, digite 10 nomes ou o numero de uma lista`)

    return await interaction.reply(createTeams(args))
  }
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

export default help

