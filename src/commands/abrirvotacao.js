import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
  SlashCommandBuilder
} from 'discord.js'
import { filledBar } from 'string-progressbar'

const PROGRESS_BAR_SIZE = 20
const PROGRESS_BAR_TOTAL_VALUE = 100

function createVoteMessage(votes) {
  let message = '\n>>> '
  const options = Object.keys(votes)
  const totalVotes = options.reduce((acc, key) => {
    return acc + votes[key]
  }, 0)
  options.forEach(opt => {
    const currentValue = votes[opt] > 0
      ? Math.floor(votes[opt] * PROGRESS_BAR_TOTAL_VALUE / totalVotes)
      : 0
    const [bar] = filledBar(PROGRESS_BAR_TOTAL_VALUE, currentValue, PROGRESS_BAR_SIZE)
    message += `${opt.toUpperCase()}: ${bar} (${votes[opt]})\n`
  })
  return message
}

export default {
  data: new SlashCommandBuilder()
    .setName('abrirvotacao')
    .setDescription('Cria uma votação entre um ou mais itens escolhidos.')
    .addStringOption(option =>
      option
        .setName('titulo')
        .setDescription('Qual o nome que você deseja dar a votação'))
    .addStringOption(option =>
      option
        .setName('opcoes')
        .setDescription('Digite as opções separadas por vírgula'))
  ,
  execute: async (interaction) => {
    const title = interaction.options.getString('titulo')
    const options = interaction.options.getString('opcoes').split(',').map(s => s.trim())
    if (!title || !options) return await interaction.reply('Votação inválida')

    const optionsVotes = {}
    const buttons = []
    options.forEach(opt => {
      optionsVotes[opt] = 0
      buttons.push(new ButtonBuilder()
        .setCustomId(opt)
        .setLabel(`Votar em ${opt}`)
        .setStyle(ButtonStyle.Primary))
    })

    const row = new ActionRowBuilder()
      .addComponents(buttons)

    const collected = await interaction.reply({
      content: `# Vote ${title}! ${createVoteMessage(optionsVotes)}`,
      components: [row]
    })

    try {
      const collector = collected.createMessageComponentCollector({ componentType: ComponentType.Button, time: 60_000 })

      collector.on('collect', async i => {
        optionsVotes[i.customId] += 1
        i.update({
          content: `# Vote ${title}! ${createVoteMessage(optionsVotes)}`,
          components: [row]
        })
      })

    } catch (error) {
      //end 
      console.log('Fim')
    }
  },
}

