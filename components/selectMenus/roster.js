const { EmbedBuilder } = require("discord.js");
const { Role } = require('../../util/roles');

module.exports = {
    name: 'roster',
    async execute(interaction) {
        interaction.channel.messages.fetch(interaction.customId.split('_')[3])
            .then(message => {
                embed = message.embeds[0].toJSON();
                if (embed.fields.length === 4) embed.fields.push(getRoster(interaction, embed));
                else embed.fields[4] = getRoster(interaction, embed);

                const editedEmbed = EmbedBuilder.from(embed);
                message.edit({ embeds: [editedEmbed] })
            })
            .catch(() => {
                if (interaction.values[0] !== 'none') console.error;
            });

            interaction.deferUpdate();
    }
}

function getRoster(interaction, embed) {
    let field = {
        name: 'Roster',
        value: `${Role.tank} Tank: \n${Role.damage} HDPS: \n${Role.damage} FDPS: \n${Role.support} MS: \n${Role.support} FS: `,
        inline: true
    }
    if (embed.fields.length >= 5) field.value = embed.fields[4].value;

    let roles = field.value.split('\n');
    let customId = interaction.values[0].split('_');
    roles[customId[2]] = `${roles[customId[2]].split(/: (.*)/s)[0]}: ${interaction.guild.members.cache.get(customId[1])}`
    field.value = roles.toString().replaceAll(',', '\n');

    return field;
}
