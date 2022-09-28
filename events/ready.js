module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        client.guilds.cache.forEach(guild => {
            guild.members.fetch();
            console.log(`Cached users in ${guild.name}`)
        })
        console.log(`Logged in as ${client.user?.tag}!`)
    }
}