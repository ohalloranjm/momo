const { BaseInteraction } = require('discord.js');

BaseInteraction.prototype.nopc = async function() {
    const response = require('./nopc.js');
    if (this.replied || this.deferred) {
        await this.followUp(response);
    } else {
        await this.reply(response);
    }
}

module.exports = {
    async nopc(interaction) {
        const response = require('./nopc.js');
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp(response)
        } else {
            await interaction.reply(response)
        }
    } 
}