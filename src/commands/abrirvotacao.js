module.exports.run = async (client, message, args) => {
    let votes = {
        sim: 0,
        nao: 0
    }
    console.log(client)
    if(!localStorage.getItem('votacao')) {
        localStorage.setItem('votacao', JSON.stringify(votes))
        return message.send('Votacao aberta! Digite !votarSim ou !votarNao para votar.')
    } else {
        return message.send('Ja existe uma votacao em aberto! \n Digite !votarSim ou !votarNao para votar ou !mostrarResultado para ver o resultado.')
    } 
}

module.exports.help = {
    name: 'abrirvotacao'
}