const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'remove',
    async execute(interaction) {
        interaction.channel.messages.fetch(interaction.customId.split('_')[1])
            .then(message => {
                embed = message.embeds[0].toJSON();

                embed.fields[5].value.split('\n').forEach(line => {
                    if (line.includes(interaction.values[0].split('_')[1])) {
                        embed.fields[5].value = embed.fields[5].value.replace(line, ''); 
                    }
                })

                if (embed.fields[5].value === '') embed.fields.pop();

                const editedEmbed = EmbedBuilder.from(embed);
                message.edit({ embeds: [editedEmbed] })
            })
            .catch(() => {
                if (interaction.values[0] !== 'none') console.error;
            });

            interaction.deferUpdate();
    }
}
