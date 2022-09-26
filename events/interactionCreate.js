module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (interaction.isCommand() && interaction.client.commands.has(interaction.commandName)) {
            try {
                await interaction.client.commands.get(interaction.commandName).execute(interaction);
            } catch (error) {
                console.log(error);
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true});
            }
        }

        if (interaction.isSelectMenu()) {
            try {
                await interaction.client.selectMenus.get(interaction.customId).execute(interaction, interaction.client)
            } catch (error) {
                console.error(error);
            }
        }
    }
}