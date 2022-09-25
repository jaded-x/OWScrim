const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, SelectMenuBuilder } = require('discord.js')

module.exports = {
    name: 'scrim',
    description: 'Create new scrim event.',
    async execute(interaction) {
        const modal = new ModalBuilder()
            .setTitle('Create Scrim Event')
            .setCustomId('scrim')
            .addComponents(
                new ActionRowBuilder().addComponents(
                        new TextInputBuilder()
                            .setCustomId("opponent")
                            .setLabel("Opponent")
                            .setStyle(TextInputStyle.Short)
                )
        )    

        return interaction.showModal(modal);
    }
}