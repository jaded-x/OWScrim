const { ActionRowBuilder, SelectMenuBuilder } = require('discord.js');
const { getDirectories } = require('../../util/fs_functions');
const { Role } = require('../../util/roles');
const fs = require('fs');

module.exports = {
    name: 'roster',
    async execute(interaction) {
        const embed = interaction.message.embeds[0];
        const message = `>>> Set Roster for **${embed.title}**\n${embed.fields[0].value.split(' ')[1]}`
        
        const roles = ['main_tank', 'hitscan_damage', 'flex_damage', 'main_support', 'flex_support']
        const roleNames = [`Tank`, 'Hitscan DPS', 'Flex DPS', 'Main Support', 'Flex Support']
        let selections = [];
        for (i = 0; i < 5; i++) {

            let options = [];
            getDirectories('./data/users/').forEach(player => {
                const playerRole = fs.readFileSync(`./data/users/${player}/role.txt`, 'utf-8');
                if (interaction.guild.members.cache.get(player) && playerRole == roles[i].split('_')[1] && !embed.fields[3].value.includes(player)) {

                    let description = '❔ Player has not replied to scrim.';
                    if (embed.fields[1].value.includes(player)) description = '✅ Player is available for scrim.';
                    else if (embed.fields[2].value.includes(player)) description = '❓ Player is marked as maybe for scrim.';

                    const option = {
                        label: `${client.users.cache.get(player).username.replace('** **', '')}`,
                        description: description,
                        value: `player_${player}_${i}`,
                        emoji: Role[playerRole]
                    }
                    options.push(option);
                }
            });

            if (options.length === 0) {
                options = {
                    label: 'None',
                    value: 'none',
                }
            }

            const selection = new ActionRowBuilder()
                .addComponents(
                    new SelectMenuBuilder()
                        .setCustomId(`roster_${roles[i]}_${interaction.message.id}`)
                        .setPlaceholder(`${roleNames[i]}`)
                        .addOptions(options)
                )

            selections.push(selection);
        }

        await interaction.reply({ 
            content: message,
            components: selections,
            ephemeral: true,
        })
    }
}