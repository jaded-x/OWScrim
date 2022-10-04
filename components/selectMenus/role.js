const { createUserDir, createUserRoleFile } = require('../../util/fs_functions');
const { Role } = require('../../util/roles')
const { capitalize } = require('../../util/format')

module.exports = {
    name: 'role',
    async execute(interaction) {
        createUserDir(interaction.user.id);
        createUserRoleFile(interaction.user.id, interaction.values[0]);

        const message = `> **Role set to ${capitalize(interaction.values[0])}** ${Role[interaction.values[0]]}`
        await interaction.update({ 
            content: message, 
            components: [] 
        });
    }
}