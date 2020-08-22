module.exports.run = async (client, message, args) => {
    let response = {
        titulo: "********** Lista de comandos **********",
        comandos: [
            {
                nome: "mix",
                descricao: "Cria dois times de 5 pessoas randomicamente",
                exemplo: "!mix nome1 nome2 nome3 nome4 nome5 nome6 nome7 nome8 nome9 nome10"
            },
            {
                nome: "abrirVotacao",
                descricao: "Abre uma votacao de sim ou nao",
                exemplo: "!abrirVotacao"
            },
            {
                nome: "votarSim",
                descricao: "Vota sim em uma votacao",
                exemplo: "!votarSim"
            },
            {
                nome: "votarNao",
                descricao: "Vota nao em uma votacao",
                exemplo: "!votarNao"
            },
            {
                nome: "mostrarResultado",
                descricao: "Mostra os resultados de uma votacao, funciona apenas se existir uma votacao aberta",
                exemplo: "!mostrarResultado"
            }
        ]
    }

    
    return message.channel.send(createMessageReturn(response))
}

function createMessageReturn(info) {
    let message = info.titulo + "\n"
    info.comandos.forEach(comando => {
        let linhaComando = `Comando 1: ${comando.nome} \n   Descricao: ${comando.descricao} \n  Exemplo: ${comando.exemplo} \n ------------------------------------------------ \n`
        message = message.concat(linhaComando)
    }) 
    return message;
}

module.exports.help = {
    name: 'help'
}