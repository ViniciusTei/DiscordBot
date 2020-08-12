const Discord = require('discord.js');
const admin = require('firebase-admin');

const db = admin.firestore();

//comando responsavel por mostrar as listas criadas
module.exports.run = async (client, message, args) => {
    const response = await db.collection('listas').get();
   
    return message.channel.send(mostrarListas(response))
}

module.exports.help = {
    name: 'listas'
}

function mostrarListas(listas) {
    let message = '';

    listas.forEach((doc) => {
        let d = doc.data();
        message += `#${d.id} - ${d.jogo} - ${convertTimestamp(d.hora._seconds)} - ${d.jogadores.length}/12\n`
    })

    if(message.length == 0) {
        message = 'Nenhuma lista foi cadastrada ainda!'
    }

    return message;
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