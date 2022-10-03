const { ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const { Role } = require('../util/roles');

module.exports = {
    name: 'role',
    description: 'Set your role.',
    async execute(interaction) {
        const message = '> **Select your role.**';

        const selection = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                    .setCustomId('role_select')
                    .setPlaceholder('Select Role')
                    .addOptions(
                        {
                            label: 'Tank',
                            value: 'tank',
                            emoji: Role['tank']
                        },
                        {
                            label: 'Damage',
                            value: 'damage',
                            emoji: Role['damage']
                        },
                        {
                            label: 'Support',
                            value: 'support',
                            emoji: Role['support']
                        }
                    )
            )

        await interaction.reply({ 
            content: message, 
            components: [selection], 
            ephemeral: true 
        });
    }
}