const { SlashCommandBuilder } = require('discord.js');

const cevaplar = [
    "Kesinlikle.",
    "Büyük ihtimalle.",
    "Evet.",
    "Görünüşe göre evet.",
    "İşaretler eveti gösteriyor.",
    "Muhtemelen.",
    "Belki.",
    "Tekrar sor.",
    "Şimdi söyleyemem.",
    "Tahmin etmek zor.",
    "Konsantre ol ve tekrar sor.",
    "Sanmıyorum.",
    "Büyük ihtimalle hayır.",
    "Hayır.",
    "Görünüşe göre hayır.",
    "Kesinlikle hayır.",
    "Umutsuz görünüyor.",
    "Çok şüpheli.",
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8top')
        .setDescription('Sihirli 8 topa bir soru sor.'),
    async execute(interaction) {
        const rastgeleCevap = cevaplar[Math.floor(Math.random() * cevaplar.length)];
        await interaction.reply(`:8ball: ${rastgeleCevap}`);
    },
};