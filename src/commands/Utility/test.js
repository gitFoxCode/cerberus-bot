module.exports = {
    name: "test",
    alias: [],
    desc: "testowa komenda",
    syntax: "",
    permissions: [],
    hidden: true,
    execute: async (message, args, client, Discord) => {
        const row = new Discord.MessageActionRow()
			.addComponents(
				new Discord.MessageButton()
					.setCustomId('primary')
					.setLabel('1881')
					.setStyle('PRIMARY'),
                new Discord.MessageButton()
                .setCustomId('primary2')
                .setLabel('1880')
                .setStyle('PRIMARY'),
                new Discord.MessageButton()
                .setCustomId('primary3')
                .setLabel('1885')
                .setStyle('PRIMARY'),
                new Discord.MessageButton()
                .setCustomId('primary4')
                .setLabel('1898')
                .setStyle('PRIMARY')
			);
            
            
		await message.reply({ content: `seiko jest własnością tej samej rodziny która założyła firme ktora robi jedne z najdrozszych zegarkow na swieice. W którym roku?`, components: [row] });
    }  
}
