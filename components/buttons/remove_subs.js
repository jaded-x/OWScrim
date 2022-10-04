const { ActionRowBuilder, SelectMenuBuilder } = require('discord.js');
const { Role } = require('../../util/roles')
const fs = require('fs');

module.exports = {
    name: 'remove_subs',
    async execute(interaction) {
        const embed = interaction.message.embeds[0];
        const message = `>>> Remove Sub for **${embed.title}**\n${embed.fields[0].value.split(' ')[1]}`
        
        let selections = [];
        let options = [];
        if (embed.fields.length === 6) {
            embed.fields[5].value.split('\n').forEach(sub => {
                sub = sub.split('┃')[1].match(/\d+/)[0];
                const playerRole = fs.readFileSync(`./data/users/${sub}/role.txt`, 'utf-8');

                let description = '❔ Player has not replied to scrim.';
                if (embed.fields[1].value.includes(sub)) description = '✅ Player is available for scrim.';
                else if (embed.fields[2].value.includes(sub)) description = '❓ Player is marked as maybe for scrim.';

                const option = {
                    label: `${client.users.cache.get(sub).username.replace('** **', '')}`,
                    description: description,
                    value: `sub_${sub}`,
                    emoji: Role[playerRole]
                }
                options.push(option);
            })
        }

        if (options.length === 0) {
            options = {
                label: 'None',
                value: 'none',
            }
        }

        const selection = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                    .setCustomId(`remove_${interaction.message.id}`)
                    .setPlaceholder(`Remove Sub`)
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