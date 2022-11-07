const { ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const { Role } = require('../util/roles');
const fs = require('fs')

module.exports = {
    name: 'team',
    description: 'Setup new team with OWScrim.',
    async execute(interaction) {
        const message = '> **Team Setup:**';
        // NAME, TEXT CHANNEL, VOICE CHANNEL, TEAM DISCORD ROLE
        var channelId = fs.readFileSync(`./data/guilds/${interaction.guild.id}/scrim_channel.txt`, 'utf-8');
        console.log(interaction.guild.channels.cache.get(`${channelId}`));
    }
}