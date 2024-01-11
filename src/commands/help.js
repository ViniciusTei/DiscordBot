module.exports.run = async (client, message, args) => {
    let response = {
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

    
    return message.channel.send(createMessageReturn(response))
}

function createMessageReturn(info) {
    let message = info.titulo + "\n"
    info.comandos.forEach((comando, index) => {
        let linhaComando = `*Comando ${index + 1}* : \n     Nome: ${comando.nome} \n     Descricao: ${comando.descricao} \n    Exemplo: ${comando.exemplo} \n ------------------------------------------------ \n`
        message = message.concat(linhaComando)
    }) 
    return message;
}

module.exports.help = {
    name: 'help'
}