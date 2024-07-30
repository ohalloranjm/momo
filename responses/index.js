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