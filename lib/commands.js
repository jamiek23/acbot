const fs = require('fs');
const Discord = require('discord.js');
const commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./lib/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.set(command.name, command);
	if(command.aliases) {
		command.aliases.forEach(alias => commands.set(alias, command));
	}
}

module.exports = commands;