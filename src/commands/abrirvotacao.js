module.exports.run = async (client, message, args) => {
    if(args.length == 0) return message.channel.send('Digite um numero de votos!')
    let votes = {
        sim: 0,
        nao: 0
    }
    await message.channel.send('Votacao aberta').then(() => {
        message.channel.awaitMessages(() => true, { max: args, time: 30000, errors: ['time'] })
            .then(collected => {
                collected.forEach(el => {
                    if(el.content == '!sim') {
                        votes.sim++
                    } else if (el.content == '!nao') {
                        votes.nao++
                    }
                })
                message.channel.send(`Resuldado: \n Sim: ${votes.sim} \n Nao: ${votes.nao}`)
            })
            .catch(collected => {
                message.channel.send('Nao houveram votos o suficiente!');
            });
    })
}

module.exports.help = {
    name: 'abrirvotacao'
}