const { createGuildDir, createGuildFile } = require('../util/fs_functions');

module.exports = {
    name: "guildCreate",
    async execute(guild) {
        createGuildDir(guild.id);

        var channelId = guild.channels.cache.find(channel => channel.name === "scrim-schedule").toString();
        createGuildFile(guild.id, 'scrim_channel', channelId);
    }
}