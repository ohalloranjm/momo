const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  SlashCommandBuilder,
} = require('discord.js');
const Roll = require('../../classes/roll.js');
const { PlayerCharacter } = require('../../database/models');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('deny')
    .setDescription('Deny a Callout')
    .addStringOption(option =>
      option
        .setName('principle')
        .setDescription('The name of called-out principle')
    )
    .addIntegerOption(option =>
      option
        .setName('extra-modifier')
        .setDescription(
          'Additional modifiers on top of your principle, e.g. hold or ongoing (conditions are automatic)'
        )
    )
    .addIntegerOption(option =>
      option
        .setName('override-modifier')
        .setDescription(
          'Manually set the total modifier, ignoring all other stats, penalties, and modifiers'
        )
    ),

  async execute(interaction) {
    const override = interaction.options.getInteger('override-modifier');

    let pc;
    if (override === null) {
      pc = await PlayerCharacter.grab(interaction, ['conditions', 'balance']);
    }

    let target = interaction.options.getString('principle');
    await interaction.deferReply({ ephemeral: !!pc && !target });

    let balanceMod;
    if (pc && !target) {
      require('../../utils/custom-methods.js');
      const { principles } = pc.getPlaybook();
      const leftButton = new ButtonBuilder()
        .setCustomId('left')
        .setStyle(ButtonStyle.Primary)
        .setLabel(`${principles[0]} (${(-pc.balance).sign()})`);
      const rightButton = new ButtonBuilder()
        .setCustomId('right')
        .setStyle(ButtonStyle.Primary)
        .setLabel(`${principles[1]} (${pc.balance.sign()})`);
      const row = new ActionRowBuilder().addComponents(leftButton, rightButton);
      const sentButtons = await interaction.followUp({
        content: 'What balance principle are you being called out on?',
        components: [row],
      });

      const confirmPrinciple = await sentButtons.awaitMessageComponent({
        filter: i => i.user.id === interaction.user.id,
        time: 60_000,
      });

      if (confirmPrinciple.customId === 'left') {
        target = principles[0];
        balanceMod = -pc.balance;
      } else {
        target = principles[1];
        balanceMod = pc.balance;
      }

      await confirmPrinciple.update({
        content: `Chosen principle: ${target}`,
        components: [],
      });
    } else if (pc) {
      const { principles } = pc.getPlaybook();
      const idx = principles.indexOf(
        principles.find(p => p.toLowerCase() === target.toLowerCase())
      );

      if (idx === -1) {
        return await interaction.followUp(
          `${target} is not a valid principle. Choose ${principles[0]} or ${principles[1]}.`
        );
      } else {
        target = principles[idx];
        balanceMod = pc.balance;
        if (idx === 0) balanceMod *= -1;
      }
    }

    const roll = new Roll();

    if (pc) {
      roll.addModifier(balanceMod, target);

      const markedConditions = pc.conditionList();
      if (markedConditions.includes('Guilty')) {
        roll.addModifier(2, 'Guilty');
      } else if (markedConditions.includes('Worried')) {
        roll.addModifier(2, 'Worried');
      }
    }

    if (override === null) {
      roll.addModifier(interaction.options.getInteger('extra-modifier'));
    } else {
      roll.addModifier(override);
    }

    await interaction.followUp(
      roll
        .sumTotal()
        .appendText('hit', 'Act as they say or mark 1-fatigue.')
        .appendText(
          'full',
          'Their words hit hard; you must also shift your balance toward the called-on principle.'
        )
        .appendText(
          'miss',
          'You stand strong; clear a condition, clear 1-fatigue, or shift your balance, your choice.'
        )
        .composeMessage('Deny a Callout')
    );
  },
};
