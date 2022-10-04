const { PermissionsBitField } = require("discord.js");

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (interaction.isCommand() && client.commands.has(interaction.commandName)) {
            try {
                if (client.commands.get(interaction.commandName).admin && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator, true)) {
                    await interaction.reply({ 
                        content: '> 🚫 **You must be an admin to use this command.\n**', 
                        ephemeral: true
                    });
                } else {
                    await client.commands.get(interaction.commandName).execute(interaction);
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
                await client.selectMenus.get(`${interaction.customId.split('_')[0]}`).execute(interaction)
            } catch (error) {
                console.error(error);
            }
        }

        if (interaction.isButton()) {
            try {
                await client.buttons.get(interaction.customId).execute(interaction);
            } catch (error) {
                console.log(error);
            }
        }
    }
}