const { capitalize } = require('../../util/format')
const { ActionRowBuilder, SelectMenuBuilder } = require("discord.js");

module.exports = {
    name: 'roster',
    async execute(interaction) {
        const embed = interaction.message.embeds[0];
        const message = `>>> Set Roster for **${embed.title}**\n${embed.fields[0].value.split(' ')[1]}`
        
        const roles = ['tank', 'hitscan_dps', 'flex_dps', 'main_support', 'flex_support']
        const selections = [];
        for (i = 0; i < 5; i++) {
            
            const selection = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                    .setCustomId(`roster_${roles[i]}`)
                    .setPlaceholder(`${capitalize(roles[i])}`)
                    .addOptions(
                        {
                            label: 'Accept',
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

            selections.push(selection);
        }

        interaction.reply({ 
            content: message,
            components: selections,
            ephemeral: true,
        });
    }
}