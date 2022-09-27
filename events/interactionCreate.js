const { PermissionsBitField } = require("discord.js");

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (interaction.isCommand() && interaction.client.commands.has(interaction.commandName)) {
            try {
                if (interaction.client.commands.get(interaction.commandName).admin && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator, true)) {
                    await interaction.reply({ 
                        content: '> 🚫 **You must be an admin to use this command.\n**', 
                        ephemeral: true
                    });
                } else {
                    await interaction.client.commands.get(interaction.commandName).execute(interaction);
                }
            } catch (error) {
                console.log(error);
                await interaction.reply({ 
                    content: 'There was an error while executing this command!', 
                    ephemeral: true
                });
            }
        }

        if (interaction.isSelectMenu()) {
            try {
                await interaction.client.selectMenus.get(interaction.customId).execute(interaction)
            } catch (error) {
                console.error(error);
            }
        }
    }
}