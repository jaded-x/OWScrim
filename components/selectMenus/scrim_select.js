const { EmbedBuilder } = require("discord.js");
const fs = require('fs');
const { Role } = require('../../util/roles');

module.exports = {
    name: 'scrim_select',
    async execute(interaction) {
        var embed = interaction.message.embeds[0].toJSON()
        const role = Role[fs.readFileSync(`./data/users/${interaction.member.id}/role.txt`, 'utf-8')];
        const option = Options[interaction.values[0]];

        for (i = 1; i <= 3; i++) {
            embed.fields[i].value.split('\n').forEach(line => {
                if (line.includes(interaction.member)) embed.fields[i].value = embed.fields[i].value.replaceAll(`${line}`, ''); 
                if (embed.fields[i].value === '') embed.fields[i].value = '** **';
            })
        }

        if (embed.fields[option].value === '** **') embed.fields[option].value = `${embed.fields[option].value}${role}┃${interaction.member}`
        else embed.fields[option].value = `${embed.fields[option].value}\n${role}┃${interaction.member}`

        for (i = 1; i <= 3; i++) {
            embed.fields[i].name = embed.fields[i].name.replace(embed.fields[i].name.match(/\d+/)[0], embed.fields[i].value.replace(/[^┃]/g, '').length);
        }


        const editedEmbed = EmbedBuilder.from(embed);
        await interaction.update({ 
            embeds: [editedEmbed]
        });
    }
}

Options = {
    'accept': 1,
    'maybe': 2,
    'decline': 3
}