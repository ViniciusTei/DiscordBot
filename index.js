const Discord = require('discord.js');
const fs = require("fs");
const config = require('./config.json');

const client = new Discord.Client();

//bot ready
client.once('ready', async () => {
    console.log('Ready!');
    
});

//load commands
client.commands = new Discord.Collection();
fs.readdir('./src/commands/', (err, files) => {
    if(err) console.error(err); 

    if(files.length < 0) return;

    files.forEach((file, index) =>{
        //check if the file is a javascript file
        if(!file.endsWith('.js')) return;

        const event = require(`./src/commands/${file}`)
        client.commands.set(event.help.name, event)
        //console.log(client.commands)
    })
});

//bot messages
client.on('message', message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;
    
    //variables
    let messageArray = message.content.split(" ");
    let command = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);

    let cmd = client.commands.get(command.slice(config.prefix.length))
    if (cmd) cmd.run(client, message, args);

});

client.login(process.env.BOT_TOKEN || config.token);
