const { playbooks } = require('../playbooks');
const {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} = require('discord.js');

const select = new StringSelectMenuBuilder()
  .setCustomId('playbook')
  .setPlaceholder('Choose a playbook.');

for (const key of Object.keys(playbooks)) {
  const playbook = playbooks[key];
  select.addOptions(
    new StringSelectMenuOptionBuilder()
      .setLabel(playbook.name)
      .setDescription(`${playbook.principles[0]} vs. ${playbook.principles[1]}`)
      .setValue(playbook.key)
  );
}

const row = new ActionRowBuilder().addComponents(select);

module.exports = [row];
