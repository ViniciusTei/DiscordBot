import { SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, ComponentType } from "discord.js"

const MIX_PLAYERS_NUMBER = 10

const help = {
  data: new SlashCommandBuilder()
    .setName('mix')
    .setDescription('Cria um time de mix aleatóriamente.')
    .addStringOption(options =>
      options
        .setName('tipo')
        .setDescription('Como escolher o time')
        .addChoices(
          { name: 'Aleatório', value: 'aleatorio' },
          { name: 'Capitão', value: 'capitao' }
        )
    ),
  execute: async (interaction) => {
    const type = interaction.options.getString('tipo')

    if (!interaction.member.voice) {
      return await interaction.reply('Você precisa estar conectado à um canal de voz.')
    }

    if (interaction.member.voice.channel.members.size < MIX_PLAYERS_NUMBER) {
      return await interaction.reply('Você precisa de 10 pessoas no canal para começar.')
    }

    switch (type) {
      case 'aleatorio':
        break;

      case 'capitao':
        const players = []

        interaction.member.voice.channel.members.forEach(member => {
          players.push(
            new StringSelectMenuOptionBuilder()
              .setLabel(member.nickname)
              .setDescription(member.user.username)
              .setValue(member.user.id)
          )
        })

        const select = new StringSelectMenuBuilder()
          .setCustomId('capitao-select')
          .setPlaceholder('Selecionar o capitão')
          .addOptions(players)

        const row = new ActionRowBuilder()
          .addComponents(select);

        const collected = await interaction.reply({
          content: 'Escolha o capitão',
          component: [row]
        })


        const collector = collected.createMessageComponentCollector({ componentType: ComponentType.StringSelect })

        collector.on('collect', async i => {
          //select captain
        })
        break;

      default:
        console.log('Mix action not regitered')
        break;
    }
  }
}

function createTeams(args) {
  let titulo = '----- Time 1 -----\n'
  let titulo2 = '----- Time 2 -----\n'
  let time1 = ''
  let time2 = ''

  args = shuffle(args);

  args.forEach((element, index) => {
    if (index < 5) {
      time1 += `${index + 1} - ${element}\n`
    } else {
      time2 += `${index + 1} - ${element}\n`
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

