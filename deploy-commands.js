const { REST, SlashCommandBuilder, Routes } = require('discord.js');
const fs = require('fs');

require('dotenv').config();

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(new SlashCommandBuilder().setName(command.name).setDescription(command.description));
}

commands.map(command => command.toJSON);

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands })
    .then((data) => console.log(`Successfully registered ${data.length} application commands.`))
    .catch(console.error);

// rest.delete(Routes.applicationCommand(process.env.CLIENT_ID, COMMAND_ID))
//     .then(() => console.log('Deleted commnadd'))
//     .catch(console.error);