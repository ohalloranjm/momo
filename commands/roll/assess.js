const { Move, Roll } = require('../../classes');
const { PlayerCharacter } = require('../../db/models');
const { STATS } = require('../../game_pieces');

const assess = new Move('assess')
    .setTitle('Assess a Situation')
    .setStat('creativity')

module.exports = { 
    data: assess.command(),
    execute: assess.respond.bind(assess)
    // async execute(interaction) {
    //     const { id } = interaction.user;
    //     const activePC = await PlayerCharacter.findOne({
    //         attributes: STATS,
    //         where: {
    //             userId: id,
    //             active: true
    //         }
    //     })

    //     await interaction.reply(new Roll()
    //         .setStat('creativity')
    //         .addModifier((await PlayerCharacter.findOne({
    //             attributes: ['creativity'],
    //             where: {
    //                 userId: interaction.user.id,
    //                 active: true
    //             }
    //         })).creativity, 'Creativity')
    //         .addModifier(interaction.options.getInteger('modifier'))
    //         .sumTotal()
    //         .appendText('full', 'Ask two questions. Take +1 ongoing while acting on the answers.')
    //         .appendText('part', 'Ask one question. Take +1 ongoing while actitng on the answer.')
    //         .appendBullet('hit', 'What here can I use to ``     ``?')
    //         .appendBullet('hit', 'Who or what is the biggest threat?')
    //         .appendBullet('hit', 'What should I be on the lookout for?')
    //         .appendBullet('hit', 'What’s my best way out/in/through?')
    //         .appendBullet('hit', 'Who ore what is in the greatest danger?')
    //         .composeMessage('Assess a Situation')
    //     );
    // },
};