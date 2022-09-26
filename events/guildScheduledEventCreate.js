const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const fs = require('fs');

module.exports = {
    name: 'guildScheduledEventCreate',
    async execute(interaction) {

        const embed = new EmbedBuilder()
            .setTitle(`Scrim vs ${interaction.name}`)
            .setColor('#F88E36')
            .addFields([
                {
                    name: 'Start Time',
                    value: `>>> <t:${Math.round(interaction.scheduledStartTimestamp / 1000)}>\n<t:${Math.round(interaction.scheduledStartTimestamp / 1000)}:R>`,
                    inline: false
                },
                {
                    name: 'Accepted ✅',
                    value: 'd',
                    inline: true
                },
                {
                    name: 'Maybe ❓',
                    value: '** **',
                    inline: true
                },
                {
                    name: 'Declined ❌',
                    value: 'd',
                    inline: true
                }
            ])
        
        const selection = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                    .setCustomId('select')
                    .setPlaceholder('Select Availability')
                    .addOptions(
                        {
                            label: 'Accept',
                            description: 'Mark yourself as available for scrim',
                            value: 'accept',
                            emoji: '✅'
                        },
                        {
                            label: 'Maybe',
                            description: 'Mark yourself as a maybe',
                            value: 'maybe',
                            emoji: '❓'
                        },
                        {
                            label: 'Decline',
                            description: 'Mark yourself as unavailable for scrim',
                            value: 'decline',
                            emoji: '❌'
                        },
                        {
                            label: 'Clear',
                            description: 'Clear your responses',
                            value: 'clear',
                            emoji: '🚫'
                        }
                    )
            )
        
        var channelId = fs.readFileSync(`./data/guilds/${interaction.guild.id}/scrim_channel.txt`, 'utf-8');
        interaction.guild.channels.cache.get(`${channelId}`).send({
           embeds: [embed],
           components: [selection]
        });
    }
}