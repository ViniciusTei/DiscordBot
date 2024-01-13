import { SlashCommandBuilder } from 'discord.js'

function createMessageReturn(info) {
    let message = info.titulo + "\n"
    info.comandos.forEach((comando, index) => {
        let linhaComando = `*Comando ${index + 1}* : \n     Nome: ${comando.nome} \n     Descricao: ${comando.descricao} \n    Exemplo: ${comando.exemplo} \n ------------------------------------------------ \n`
        message = message.concat(linhaComando)
    }) 
    return message;
}

const help = {
  data: new SlashCommandBuilder().setName('help').setDescription('Mostra uma lista com os comandos existentes e como usa-los'),
  execute: async (interaction) => {
    let command = {
        titulo: "*** Lista de comandos ***",
        comandos: [
            {
                nome: "mix",
                descricao: "Cria dois times de 5 pessoas. Os times são escolhidos aleatóriamente.",
                exemplo: "!mix nome1 nome2 nome3 nome4 nome5 nome6 nome7 nome8 nome9 nome10"
            },
            {
                nome: "abrirvotacao",
                descricao: "Abre uma votação entre duas ou mais opções. Deve ser passado um título e as opções separadas por vírgula.",
                exemplo: "!abrirvotacao TITULO, OPÇAO1, OPÇAO2..."
            },
            {
                nome: "help",
                descricao: "Mostra a lista de comandos existentes",
                exemplo: "!help"
            }
        ]
    }

    await interaction.reply({
      content: createMessageReturn(command),
      ephemeral: true // essa opcao faz a mensagem a aparecer apenas para quem digitou o comando
    })
  }
}

export default help
