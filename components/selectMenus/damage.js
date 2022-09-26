const { createUserDir, createUserRoleFile } = require('../../util/fs_functions');

module.exports = {
    name: 'damage',
    async execute(interaction, client) {
        createUserDir(interaction.user.id);
        createUserRoleFile(interaction.user.id, '<:damage:1023991444245065768>');

        const message = '> **Role set to Damage** <:damage:1023991444245065768>'
        interaction.update({ content: message, components: [] });
    }
}