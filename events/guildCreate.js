const { createGuildDir, createGuildFile } = require('../util/fs_functions');

module.exports = {
    name: "guildCreate",
    async execute(guild) {
        createGuildDir(guild.id);
        guild.members.fetch();

        var channelId = await guild.channels.cache.find(channel => channel.name === "scrim-schedule").toString().match(/\d+/)[0];
        createGuildFile(guild.id, 'scrim_channel', channelId);
        createGuildFile(guild.id, 'info', '');

        console.log(channelId)

        
    }
}