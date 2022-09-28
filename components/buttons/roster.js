const { capitalize } = require('../../util/format');
const { ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const fs = require('fs');

module.exports = {
    name: 'roster',
    async execute(interaction) {
        const embed = interaction.message.embeds[0];
        const message = `>>> Set Roster for **${embed.title}**\n${embed.fields[0].value.split(' ')[1]}`
        
        const roles = ['main_tank', 'hitscan_damage', 'flex_damage', 'main_support', 'flex_support']
        const roleNames = ['Tank', 'Hitscan DPS', 'Flex DPS', 'Main Support', 'Flex Support']
        let selections = [];
        for (i = 0; i < 5; i++) {

            let options = [];
            embed.fields[1].value.split('\n').forEach(player => {
                if (fs.readFileSync(`./data/users/${player.split('┃')[1].match(/\d+/)[0]}/role.txt`, 'utf-8') == roles[i].split('_')[1]) {
                    const option = {
                        label: client.users.cache.get(player.split('┃')[1].match(/\d+/)[0]).username.replace('** **', ''),
                        value: `player_${player.split('┃')[1]}`,
                        emoji: player.split('┃')[0]
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
                    .setCustomId(`roster_${roles[i]}`)
                    .setPlaceholder(`${roleNames[i]}`)
                    .addOptions(options)
            )

            selections.push(selection);
        }

        await interaction.reply({ 
            content: message,
            components: selections,
            ephemeral: true,
        }).then(interaction.reply('hi'));
    }
}