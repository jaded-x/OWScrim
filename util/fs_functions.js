const fs = require('fs');

module.exports = {
    createGuildDir, createGuildFile
}

function createGuildDir(guildId) {
    var dir = `./data/guilds/${guildId}`;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
}

function createGuildFile(guildId, name, content) {
    var dir = `./data/guilds/${guildId}/${name}.txt`;
    if (!fs.existsSync(dir)) {
        fs.writeFile(dir, content, function (err) {
            if (err) throw err;
            console.log(`Created new guild data file: ${guildId}/${name}.txt`)
        })
    }
}