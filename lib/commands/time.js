const Discord = require('discord.js');
const { DateTime } = require('luxon');

const countries = [
	'America/Los_Angeles',
	'America/New_York',
	'Europe/London',
	'Asia/Istanbul',
	'Asia/Manila',
	'Pacific/Auckland'
];
const puns = [
	'What\'s the time Mr Wolf?',
	'Have you ever tried to eat a clock? It’s very time consuming.',
	'What do you call a story that one clock tells to another? Second hand information.',
	'We call our dog Rolex, since he’s a watchdog.',
	'6:30 is the best time on a clock… hands down.',
	'I’ve just been fired from the clock making factory after all those extra hours I put in.',
	'Even a broken clock is right twice a day.',
	'Time flies like an arrow; fruit flies like a banana.'
];

const clockEmoji = function(hour, minute) {
	if(hour > 12) {
		hour = hour - 12;
	}
	if(hour === 0) {
		hour = 12;
	}
	if(minute > 29) {
		minute = 30;
	}
	else {
		minute = 0;
	}
	return `:clock${hour}${minute !== 0 ? minute : ''}:`;
}

const getRandomInt = function(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min);
}

module.exports = {
	name: 'time',
	description: 'Tells the time for various timezones',
	execute(message) {
		const now = DateTime.utc();
		const times = countries.map(country => now.setZone(country));

		const embed = new Discord.MessageEmbed()
			.setColor('DARK_VIVID_PINK')
			.setTitle(`${message.guild.name} Time Check`)
			.setDescription(`:clock: ${puns[getRandomInt(0, puns.length - 1)]}`)
			.setTimestamp()
			.setThumbnail(message.guild.iconURL());

		embed.addField('UTC', `${clockEmoji(now.hour, now.minute)} ${now.toISODate()} ${now.toLocaleString(DateTime.TIME_SIMPLE)}`)

		times.forEach(time => {
			const heading = `${time.offsetNameLong} (${time.zoneName.replace('_', ' ')})`;
			const content = `${clockEmoji(time.hour, time.minute)} ${time.toISODate()} ${time.toLocaleString(DateTime.TIME_SIMPLE)}`;
			embed.addField(heading, content);
		});

		message.channel.send(embed);
	},
};