const { EmbedBuilder } = require("discord.js");
const fs = require('fs');
const { Role } = require('../../util/roles');

module.exports = {
    name: 'scrim_select',
    async execute(interaction) {
        const embed = interaction.message.embeds[0].toJSON()
        const role = Role[fs.readFileSync(`./data/users/${interaction.member.id}/role.txt`, 'utf-8')];

        for (i = 1; i <= 3; i++) {
            embed.fields[i].value = embed.fields[i].value.replaceAll(`\n${role}┃${interaction.member}`, '');
            embed.fields[i].value = embed.fields[i].value.replaceAll(`${role}┃${interaction.member}`, '');
        }

        if (embed.fields[Options[interaction.values[0]]].value === '** **') embed.fields[Options[interaction.values[0]]].value = `${embed.fields[Options[interaction.values[0]]].value}${role}┃${interaction.member}`
        else embed.fields[Options[interaction.values[0]]].value = `${embed.fields[Options[interaction.values[0]]].value}\n${role}┃${interaction.member}`


        const editedEmbed = EmbedBuilder.from(embed);
        await interaction.update({ embeds: [editedEmbed]});
    }
}

Options = {
    'accept': 1,
    'maybe': 2,
    'decline': 3
}