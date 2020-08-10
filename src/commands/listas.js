const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    return message.channel.send(`Hello world`)
}

module.exports.help = {
    name: 'listas'
}