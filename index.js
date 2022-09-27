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
client.selectMenus = new Collection();
initInteraction(client.commands, './commands');
initInteraction(client.selectMenus, './components/selectMenus');

client.login(process.env.DISCORD_TOKEN);

function initInteraction(collection, dir) {
    const interactionFiles = fs.readdirSync(dir).filter(file => file.endsWith('.js'));
    for (const file of interactionFiles) {
        const interaction = require(`${dir}/${file}`);
        collection.set(interaction.name, interaction);
    }
}
