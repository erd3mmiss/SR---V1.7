const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rastgele-sayı')
        .setDescription('Belirtilen aralıkta rastgele bir sayı üretir.')
        .addIntegerOption(option =>
            option.setName('min')
                .setDescription('Rastgele sayının minimum değerini girin.')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('max')
                .setDescription('Rastgele sayının maksimum değerini girin.')
                .setRequired(true)),
    async execute(interaction) {
        const minimum = interaction.options.getInteger('min');
        const maksimum = interaction.options.getInteger('max');

        if (minimum >= maksimum) {
            return await interaction.reply({ content: 'Minimum değer maksimum değerden büyük veya eşit olamaz.', ephemeral: true });
        }

        const rastgeleSayi = Math.floor(Math.random() * (maksimum - minimum + 1)) + minimum;
        await interaction.reply(`Rastgele sayı: **${rastgeleSayi}** (Aralık: ${minimum} - ${maksimum})`);
    },
};