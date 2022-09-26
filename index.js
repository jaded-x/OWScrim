const fs  = require('fs');

const { Client, GatewayIntentBits, Collection } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildScheduledEvents
    ]
});

require('dotenv').config();

const eventFiles = fs.readdirSync('./events').filter((file) => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) client.once(event.name, (...args) => event.execute(...args, client));
    else client.on(event.name, (...args) => event.execute(...args, client))
}

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.selectMenus = new Collection();
const selectMenuFiles = fs.readdirSync('./components/selectMenus').filter(file => file.endsWith('.js'));
for (const file of selectMenuFiles) {
    const selectMenu = require(`./components/selectMenus/${file}`);
    client.selectMenus.set(selectMenu.name, selectMenu);
}

client.login(process.env.DISCORD_TOKEN);
