const { ActionRowBuilder, SelectMenuBuilder } = require("discord.js")

module.exports = {
    name: 'role',
    description: 'Set your role.',
    async execute(interaction) {
        const message = '> **Select your role.**';

        const selection = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                    .setCustomId('select_role')
                    .setPlaceholder('Select Role')
                    .addOptions(
                        {
                            label: 'Tank',
                            value: 'tank',
                            emoji: '<:tank:1023991202808348744>'
                        },
                        {
                            label: 'Damage',
                            value: 'damage',
                            emoji: '<:damage:1023991444245065768>'
                        },
                        {
                            label: 'Support',
                            value: 'support',
                            emoji: '<:support:1023991410434773042>'
                        }
                    )
            )

        await interaction.reply({ content: message, components: [selection], ephemeral: true });
    }
}