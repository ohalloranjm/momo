module.exports = {
  name: 'acceptInputs',

  execute(interaction) {
    interaction.inputs = {};
    return interaction;
  },
};
