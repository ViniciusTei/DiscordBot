import { SlashCommandBuilder } from 'discord.js'

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
    const options = interaction.options.getString('opcoes') 
    if(!title || !options) return await interaction.reply('Votação inválida')

    const optionsVotes = {}
    options.forEach(opt => {
        optionsVotes[opt] = 0
    })

    await interaction.reply('Votação aberta')
    const collected = interaction.fetchReply()
    console.log('collected from chat', collected)

    // await message.channel.send('Votacao aberta').then(() => {
    //     message.channel.awaitMessages(() => true, { max: args, time: 30000, errors: ['time'] })
    //         .then(collected => {
    //             collected.forEach(el => {
    //                 if (options.includes(el.content)) {
    //                     optionsVotes[el.content] += 1
    //                 }
    //             })
    //             let restulMessage = `${title}: \n`
    //
    //             for (const opt in options) {
    //                 let optMessage = `${opt}: ${optionsVotes[opt]} \n`
    //                 restulMessage += optMessage
    //             }
    //             message.channel.send(restulMessage)
    //         })
    //         .catch(collected => {
    //             message.channel.send('Não houveram votos o suficiente!');
    //         });
    // })
  },
}

