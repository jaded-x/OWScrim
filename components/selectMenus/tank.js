const { createUserDir, createUserRoleFile } = require('../../util/fs_functions');

module.exports = {
    name: 'tank',
    async execute(interaction, client) {
        createUserDir(interaction.user.id);
        createUserRoleFile(interaction.user.id, '<:tank:1023991202808348744>');

        const message = "> **Role set to Tank** <:tank:1023991202808348744>"
        interaction.update({ content: message, components: [] });
    }
}