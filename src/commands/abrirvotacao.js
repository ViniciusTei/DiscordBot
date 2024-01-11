module.exports.run = async (client, message, args) => {
    if(args.length < 3) return message.channel.send('Digite um título e as opções desejadas separadas por vírgula! Exemplo: !abrivotacao TITULO, OPCAO1, OPCAO2')
    const title = args[0]
    const options = args.slice(1)

    const optionsVotes = {}
    options.forEach(opt => {
        optionsVotes[opt] = 0
    })

    await message.channel.send('Votacao aberta').then(() => {
        message.channel.awaitMessages(() => true, { max: args, time: 30000, errors: ['time'] })
            .then(collected => {
                collected.forEach(el => {
                    if (options.includes(el.content)) {
                        optionsVotes[el.content] += 1
                    }
                })
                let restulMessage = `${title}: \n`

                for (const opt in options) {
                    let optMessage = `${opt}: ${optionsVotes[opt]} \n`
                    restulMessage += optMessage
                }
                message.channel.send(restulMessage)
            })
            .catch(collected => {
                message.channel.send('Não houveram votos o suficiente!');
            });
    })
}

module.exports.help = {
    name: 'abrirvotacao'
}