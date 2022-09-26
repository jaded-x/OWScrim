const fs  = require('fs');

module.exports = {
    createGuildDir, createGuildFile, createUserDir, createUserRoleFile
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

function createUserDir(userId) {
    var dir = `./data/users/${userId}`;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
}

function createUserRoleFile(userId, role) {
    var dir = `./data/users/${userId}/role.txt`
    fs.writeFile(dir, role, function (err) {
        if (err) throw err;
        console.log(`Set role of ${userId} to ${role}`)
    })
} 