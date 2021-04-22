const Discord = require('discord.js');

const messageTitle = 'Rules and Code of Conduct';
const rulesIntro = ` We want AutismCentral to be a safe and welcoming community. This Code of Conduct represents the behaviour we expect of you and what you should expect from others.

We also expect you to follow the standard Discord Community guidelines, which are available at https://discord.com/guidelines.
`;
const rules = [
	['No spamming', 'Don\'t send a lot of small messages right after each other. Do not disrupt chat by spamming.'],
	['Be respectful', 'You must respect all users, regardless of your liking towards them. Treat others the way you want to be treated.'],
	['No racism, sexism or ableism', 'We take a zero tolerance approach to this and it is not welcome in this community.'],
	['No inappropriate language', 'The use of profanity is allowed but should be kept chill. However, any derogatory language towards any user is prohibited.'],
	['No advertisements', 'We do not tolerate any kind of unsolicited advertisements whether it be for other communities, streams, or sites. You can post your content in the relevant channels, so long as it provides actual value. Permission may be granted to post an advertisement, at the sole discretion of a **Moderator** or **Admin.**'],
	['Avoid uncivil behaviour', 'Do not cause a nuisance in the community, repeated complaints from several members will lead to administrative action.'],
	['Avoid discussion of political issues', `We don’t want to start any unnecessary conflict just because someone supports a different political party. Everyone has different views and beliefs, so we accept them for what they are. Examples of political issues are:
	• Political parties
	• Immigration
	• Drug policy`],
	['Use of alternate accounts is prohibited', 'Users found to be using alt accounts will result in having a kick or ban for all of their accounts.'],
	['Direct & Indirect Threats', 'Threats to other users of DDoS, Death, DoX, abuse, and other malicious threats are prohibited and will result in a report to Discord’s Trust and Safety team.'],
	['No pornographic/adult/other NSFW material', 'Under 18s are present on the server, therefore NSFW content is not permitted.'],
]

function showRule(message, args) {
	const embed = new Discord.MessageEmbed()
		.setColor('DARK_VIVID_PINK')
		.setTitle(`${message.guild.name} ${messageTitle}`)
		.setTimestamp()
		.setThumbnail(message.guild.iconURL());

	let shouldSend = false;

	args.forEach(index => {
		const ruleNumber = parseInt(index, 10);
		if(!ruleNumber || ruleNumber < 1 || ruleNumber > (rules.length + 1) || !rules[index]) {
			message.reply(`${index} is not a valid rule number`);
			return;	
		}
		shouldSend = true;
		const rule = rules[ruleNumber - 1];
		embed.addField(`${ruleNumber}. ${rule[0]}`, rule[1]);
	});

	embed.setFooter('Note: this is a subset of the rules. For a full list run !rules');

	if(shouldSend) {
		message.channel.send(embed);
	}
}

module.exports = {
	name: 'rules',
	aliases: ['rule'],
	description: 'Displays the server rules/code of conduct',
	execute(message, args) {
		if(args.length) {
			return showRule(message, args);
		}

		// Show all rules
		const embed = new Discord.MessageEmbed()
			.setColor('DARK_VIVID_PINK')
			.setTitle(`${message.guild.name} ${messageTitle}`)
			.setDescription(rulesIntro)
			.setTimestamp()
			.setThumbnail(message.guild.iconURL());

		rules.forEach((rule, index) => {
			embed.addField(`${index + 1}. ${rule[0]}`, rule[1]);
		});

		message.channel.send(embed);
	},
};