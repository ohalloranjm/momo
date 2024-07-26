const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = { 
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Test embed')
        .addStringOption(option => option.setName('name')
            .setDescription('name test')
        )
        .addStringOption(option => option.setName('description')
            .setDescription('description test')
        ),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(0x5555FF)
            .setTitle('Some title')
            .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png' })
            .setThumbnail('https://i.imgur.com/AfFp7pu.png')
            .setDescription('Some description here')
            .setURL('https://discord.js.org/')
            .addFields(
                { name: 'Trick', value: ':game_die: (2, 2) + 3 (:bulb:) = 7' },
                { name: 'Result', value: 'You pull it off. Choose one.\n* They are deceived for some time\n* They act foolishly; the GM tells you what additional opportunity they give you' },
            )
            .setImage('https://i.imgur.com/AfFp7pu.png')
            .setTimestamp()
            .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
        await interaction.reply({
            content: "ayup",
            embeds: [embed]
        });
    },
};