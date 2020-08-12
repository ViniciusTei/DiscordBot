const admin = require('firebase-admin');

const db = admin.firestore();

module.exports.run = async (client, message, args) => {
    let response = null;
    if(args.length == 1) {
        if(!isNaN(args[0])) {
            response = await db.collection('listas').where('id', '==', args[0]).get();
        }
    }
   response.forEach(doc => {
       let d = doc.data()

       return message.channel.send(mostrarDetalhes(d))
   })
}

module.exports.help = {
    name: 'detalhar'
}

function mostrarDetalhes(lista) {
    let message = `#${lista.id} - ${lista.jogo} - ${convertTimestamp(lista.hora._seconds)} - ${lista.jogadores.length}/12\n`
    if(lista.jogadores.length > 0) {
        lista.jogadores.forEach(nomeJogador => {
            message += `-> ${nomeJogador}\n`
        })
    } else {
        message += `nao tem jogadores`
    }
    return message
}

function convertTimestamp(timestamp) {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(timestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2)

    return formattedTime;
}