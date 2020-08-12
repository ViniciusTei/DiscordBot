const admin = require('firebase-admin');

const db = admin.firestore();

module.exports.run = async (client, message, args) => {
    console.log(args)
    let novo_id = await db.collection('listas').get();
    let jogo = args[0]
    let hora = args[1]

    let d = new Date(); // creates a Date Object using the clients current time

    let [hours,minutes] = hora.split(':'); 

    d.setHours(+hours); // set the hours, using implicit type coercion
    d.setMinutes(minutes); // you can pass Number or String, it doesn't really matter

    let nova_lista = {
        id: novo_id._size + 1,
        hora: d,
        jogo: jogo,
        jogadores: []
    }

    let res = await db.collection('listas').doc().set(nova_lista)
    return message.channel.send('Lista criada com sucesso!')
}

module.exports.help = {
    name: 'criar'
}