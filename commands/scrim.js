const { createGuildFile } = require('../util/fs_functions');

module.exports = {
    name: 'scrim',
    description: 'Scrims will be shown in the channel this command is executed in (Admin Only).',
    admin: true,
    async execute(interaction) {
        createGuildFile(interaction.guild.id, 'scrim_channel', interaction.channelId);
        await interaction.reply({ 
            content: `> **Set ${interaction.guild.channels.cache.get(interaction.channelId).toString()} as scrim channel.**`, 
            ephemeral: true
        });
    }
}