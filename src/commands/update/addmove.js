const { SlashCommandBuilder } = require('discord.js');
const { playbookMoves } = require('../../playbooks');
const { PlayerCharacter } = require('../../database/models');
const { ValidationError } = require('sequelize');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('addmove')
    .setDescription('Add a new playbook move')
    .addStringOption(option =>
      option
        .setName('move')
        .setDescription('The move to add')
        .setAutocomplete(true)
        .setRequired(true)
    ),

  async autocomplete(interaction) {
    const focusedValue = interaction.options.getFocused();
    const choices = Object.entries(playbookMoves).map(([k, v]) => ({
      name: `${k.slice(0, -1)} - ${v}`,
      value: k,
    }));
    const filtered = choices.filter(({ name }) =>
      name.toLowerCase().includes(focusedValue.toLowerCase())
    );
    const final = filtered.length > 25 ? filtered.slice(0, 25) : filtered;
    await interaction.respond(final);
  },

  async execute(interaction) {
    await interaction.deferReply();
    const move = interaction.options.getString('move');

    const pc = await PlayerCharacter.grab(interaction);
    if (!pc) return interaction.followUp(PlayerCharacter.nopc);

    try {
      await pc.createTakenMove({ moveId: move });
      return interaction.followUp(
        `Successfully added ${playbookMoves[move]} to your character.`
      );
    } catch (err) {
      if (err instanceof ValidationError && err.errors[0].path === 'moveId') {
        interaction.followUp(
          `Error: \`\`${move}\`\` is not a valid playbook move identifier. Try again, and make sure to use the drop-down autocomplete.`
        );
      } else {
        throw err;
      }
    }
  },
};
