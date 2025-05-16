const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('yazı-tura')
        .setDescription('Yazı mı tura mı geldiğini rastgele söyler.'),
    async execute(interaction) {
        const rastgeleSayi = Math.random();
        const sonuç = rastgeleSayi < 0.5 ? 'Yazı' : 'Tura';
        await interaction.reply(`**${sonuç}** geldi!`);
    },
};