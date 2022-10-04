const { EmbedBuilder } = require("discord.js");
const { Role } = require('../../util/roles');
const fs = require('fs');

module.exports = {
    name: 'subs',
    async execute(interaction) {
        interaction.channel.messages.fetch(interaction.customId.split('_')[1])
            .then(message => {
                embed = message.embeds[0].toJSON();
                if (embed.fields.length === 4) embed.fields.push({
                    name: 'Roster',
                    value: `${Role.tank} Tank: \n${Role.damage} HDPS: \n${Role.damage} FDPS: \n${Role.support} MS: \n${Role.support} FS: `,
                    inline: true
                });

                let playerId = interaction.values[0].split('_')[1];
                let playerRole = fs.readFileSync(`./data/users/${playerId}/role.txt`, 'utf-8');

                if (embed.fields.length === 6) if (!embed.fields[5].value.includes(playerId)) embed.fields[5].value = `${embed.fields[5].value}\n${Role[playerRole]}┃${interaction.guild.members.cache.get(playerId)}`
                
                if (embed.fields.length === 5) embed.fields.push({
                    name: 'Subs',
                    value: `${Role[playerRole]}┃${interaction.guild.members.cache.get(playerId)}`,
                    inline: true
                });

                const editedEmbed = EmbedBuilder.from(embed);
                message.edit({ embeds: [editedEmbed] })
            })
            .catch(() => {
                if (interaction.values[0] !== 'none') console.error;
            });

            interaction.deferUpdate();
    }
}
