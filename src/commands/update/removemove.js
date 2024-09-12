const { SlashCommandBuilder } = require('discord.js');
const { playbookMoves } = require('../../playbooks');
const { PlayerCharacter } = require('../../database/models');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('removemove')
    .setDescription('Remove a playbook move from your character')
    .addStringOption(option =>
      option
        .setName('move')
        .setDescription('The move to remove')
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
    await interaction.deferReply({ ephemeral: true });
    const pc = await PlayerCharacter.grab(interaction);
    if (!pc) return interaction.followUp(PlayerCharacter.nopc);
    const move = interaction.options.getString('move');
    if (!(move in playbookMoves))
      return interaction.followUp(
        `Error: \`\`${move}\`\` is not a valid playbook move identifier. Try again, and make sure to use the drop-down autocomplete.`
      );
    const targetMove = pc.TakenMoves.find(m => m.moveId === move);
    console.log(targetMove);
    if (!targetMove)
      return await interaction.followUp(
        `${pc.name} does not have the move ${playbookMoves[move]}.`
      );
    await targetMove.destroy();
    return await interaction.followUp(
      `Successfully removed ${playbookMoves[move]} from ${pc.name}.`
    );
  },
};
