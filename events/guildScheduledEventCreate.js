const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
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
                    value: `>>> <t:${Math.round(interaction.scheduledStartTimestamp / 1000)}> \n<t:${Math.round(interaction.scheduledStartTimestamp / 1000)}:R>`,
                    inline: false
                },
                {
                    name: 'Accepted (0) ✅     ** **',
                    value: '** **',
                    inline: true
                },
                {
                    name: 'Maybe (0) ❓     ** **',
                    value: '** **',
                    inline: true
                },
                {
                    name: 'Declined (0) ❌',
                    value: '** **',
                    inline: true
                }
            ]);
        
        const selection = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                    .setCustomId('scrim_select')
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
                        }
                    )
            )

        const button = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('roster')
                        .setLabel('Set Roster')
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId('subs')
                        .setLabel('Add Sub')
                        .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                        .setCustomId('remove_subs')
                        .setLabel('Remove Sub')
                        .setStyle(ButtonStyle.Danger),
                )
            
        var channelId = fs.readFileSync(`./data/guilds/${interaction.guild.id}/scrim_channel.txt`, 'utf-8');
        await interaction.guild.channels.cache.get(`${channelId}`).send({
           embeds: [embed],
           components: [selection, button]
        });
    }
}