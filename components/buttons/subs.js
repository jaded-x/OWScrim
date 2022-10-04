const { ActionRowBuilder, SelectMenuBuilder } = require('discord.js');
const { getDirectories } = require('../../util/fs_functions');
const { Role } = require('../../util/roles');
const fs = require('fs');

module.exports = {
    name: 'subs',
    async execute(interaction) {
        const embed = interaction.message.embeds[0];
        const message = `>>> Add Sub for **${embed.title}**\n${embed.fields[0].value.split(' ')[1]}`
        
        let selections = [];
        let options = [];
        getDirectories('./data/users/').forEach(player => {
            const playerRole = fs.readFileSync(`./data/users/${player}/role.txt`, 'utf-8');
            players: if (interaction.guild.members.cache.get(player) && !embed.fields[3].value.includes(player)) {
                if (embed.fields.length === 5) if (embed.fields[4].value.includes(player)) break players;
                if (embed.fields.length === 6) if (embed.fields[5].value.includes(player)) break players;

                let description = '❔ Player has not replied to scrim.';
                if (embed.fields[1].value.includes(player)) description = '✅ Player is available for scrim.';
                else if (embed.fields[2].value.includes(player)) description = '❓ Player is marked as maybe for scrim.';

                const option = {
                    label: `${client.users.cache.get(player).username.replace('** **', '')}`,
                    description: description,
                    value: `sub_${player}`,
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
                    .setCustomId(`subs_${interaction.message.id}`)
                    .setPlaceholder(`Sub`)
                    .addOptions(options)
            )

        selections.push(selection);

        await interaction.reply({ 
            content: message,
            components: selections,
            ephemeral: true,
        })
    }
}