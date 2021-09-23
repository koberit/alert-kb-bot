
// Require the necessary discord.js classes
const { Client, Intents, MessageEmbed } = require('discord.js');
const fs = require('fs')
const axios = require('axios').default;
var token = process.env.discordToken;



const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', async () => {
	console.log(`Logged in as ${client.user.tag}!`);
	//const channel = await client.channels.fetch("889827861559668786");
	//channel.send('KOBERIT');
});


client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'nbb-urls') {
		axios.get('https://api.nvidia.partners/edge/product/search?page=1&limit=9&locale=de-de&manufacturer=NVIDIA&manufacturer_filter=NVIDIA~7,ACER~21,ALIENWARE~1,AORUS~5,ASUS~44,DELL~26,EVGA~6,GAINWARD~11,GIGABYTE~29,HP~15,INNO3D~5,LENOVO~5,MSI~46,PALIT~4,PNY~5,RAZER~8,ZOTAC~17&sorting=lp')
			.then(function (response) {
				// handle success
				const links = [];
				const exampleEmbed = new MessageEmbed()
					.setColor('#0099ff')
					.setTitle('NBB NVIDIA FE LINKS')
					/*.addFields(
						{ name: 'Regular field title', value: 'Some value here' },
						{ name: '\u200B', value: '\u200B' },
						{ name: 'Inline field title', value: 'Some value here', inline: true },
						{ name: 'Inline field title', value: 'Some value here', inline: true },
					)*/
					.setTimestamp()


				exampleEmbed.addField('KARTE', `${response.data.searchedProducts.featuredProduct.displayName}`);
				response.data.searchedProducts.featuredProduct.retailers.forEach(element1 => {
					//console.log(element1.purchaseLink);
					exampleEmbed.addField('LINK', `${element1.purchaseLink}`);
					links[response.data.searchedProducts.featuredProduct.displayName] = element1.purchaseLink;
				});
				exampleEmbed.addField('\u200B', '\u200B');

				response.data.searchedProducts.productDetails.forEach(element => {
					//console.log(element.displayName);
					exampleEmbed.addField(`${element.displayName}`, '_');
					//console.log(element.productPrice);
					element.retailers.forEach(element1 => {
						//console.log(element1.purchaseLink);
						exampleEmbed.addField(`**${element1.purchaseLink}**`, '\u200B');
						links[element.displayName] = element1.purchaseLink;
					});
				});

	

				interaction.reply({ embeds: [exampleEmbed] });


			})
			.catch(function (error) {
				// handle error
				console.log(error);
			})
			.then(function () {
				//interaction.reply('CMD NBB-URLS WORK IN PROGRESS');
			});

	} else if (commandName === 'server') {
		await interaction.reply('Server info.');
	} else if (commandName === 'user') {
		await interaction.reply('User info.');
	}
});
// Login to Discord with your client's token
client.login(token);
