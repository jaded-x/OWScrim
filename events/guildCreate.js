const fs = require('../util/fs_functions');

module.exports = {
    name: "guildCreate",
    async execute(guild) {
        fs.createGuildDir(guild.id);

        var channelId = guild.channels.cache.find(channel => channel.name === "scrim-schedule").toString();
        fs.createGuildFile(guild.id, 'scrim_channel', channelId);
    }
}