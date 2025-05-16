const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('zar-at')
        .setDescription('Rastgele bir zar atar.')
        .addIntegerOption(option =>
            option.setName('sayı')
                .setDescription('Atılacak zar sayısını belirtin (isteğe bağlı, varsayılan 1).')
                .setMinValue(1)
                .setMaxValue(10)
                .setRequired(false)),
    async execute(interaction) {
        const atilacakZarSayisi = interaction.options.getInteger('sayı') || 1;
        let sonuçlar = [];
        let toplam = 0;

        for (let i = 0; i < atilacakZarSayisi; i++) {
            const zarSonucu = Math.floor(Math.random() * 6) + 1;
            sonuçlar.push(zarSonucu);
            toplam += zarSonucu;
        }

        await interaction.reply(`**${atilacakZarSayisi}** adet zar atıldı: ${sonuçlar.join(', ')} (Toplam: **${toplam}**)`);
    },
};