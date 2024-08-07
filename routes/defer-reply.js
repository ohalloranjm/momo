module.exports = {
  name: 'deferReply',

  async execute(interaction, ephemeral = false) {
    await interaction.deferReply({ ephemeral });
    return interaction;
  },
};
