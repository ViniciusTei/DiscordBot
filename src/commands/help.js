module.exports.run = async (client, message, args) => {
    let response = {
        titulo: "*** Lista de comandos ***",
        comandos: [
            {
                nome: "mix",
                descricao: "Cria dois times de 5 pessoas randomicamente",
                exemplo: "!mix nome1 nome2 nome3 nome4 nome5 nome6 nome7 nome8 nome9 nome10"
            },
            {
                nome: "abrirvotacao",
                descricao: "Abre uma votacao de sim ou nao, deve ser passado um numero que representa a quantidade de votos a ser computada.",
                exemplo: "!abrirvotacao #n"
            },
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