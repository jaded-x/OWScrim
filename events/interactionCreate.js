module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isCommand() || !interaction.client.commands.has(interaction.commandName)) return;
        
        try {
            await interaction.client.commands.get(interaction.commandName).execute(interaction);
        } catch (error) {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true});
        }
    }
}