const { createUserDir, createUserRoleFile } = require('../../util/fs_functions');

module.exports = {
    name: 'support',
    async execute(interaction, client) {
        fs.createUserDir(interaction.user.id);
        fs.createUserRoleFile(interaction.user.id, '<:support:1023991410434773042>');

        const message = "> **Role set to Support ** <:support:1023991410434773042>"
        interaction.update({ content: message, components: [] });
    }
}