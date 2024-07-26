const { SlashCommandBuilder } = require('discord.js');
const Roll = require('../../classes/roll.js');

module.exports = { 
    data: new SlashCommandBuilder()
        .setName('trick')
        .setDescription('Trick')
        .addIntegerOption(option =>
            option.setName('modifier')
                .setDescription('A number to add to your roll, or a negative number to subtract from it.')
        ),
    async execute(interaction) {
        await interaction.reply(new Roll('trick an NPC')
            .addModifier(interaction.options.getInteger('modifier'))
            .sumTotal()
            .appendText('hit', 'They fall for it and do what you want for the moment.')
            .appendText('full', 'Pick two:')
            .appendText('part', 'Pick one:')
            .appendBullet('hit', 'They stumble; take +1 forward to acting against them.')
            .appendBullet('hit', 'They act foolishly; the GM tells you what additional opportunity they give you.')
            .appendBullet('hit', 'They overcommit; they are deceived for some time.')
            .composeMessage('Trick an NPC')
        );
    },
};