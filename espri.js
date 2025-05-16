const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('espri-internet')
        .setDescription('İnternetten rastgele bir espri getirir.'),
    async execute(interaction) {
        try {
            const response = await fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&safe-mode'); // Örnek bir ücretsiz espri API'si
            const data = await response.json();

            if (data.error) {
                return await interaction.reply('Espri getirilirken bir hata oluştu.');
            }

            let espriMetni = '';
            if (data.joke) {
                espriMetni = data.joke;
            } else if (data.setup && data.delivery) {
                espriMetni = `${data.setup}\n\n${data.delivery}`;
            } else {
                espriMetni = 'Beklenmeyen bir espri formatı!';
            }

            await interaction.reply(espriMetni);

        } catch (error) {
            console.error('Espri getirilirken hata:', error);
            await interaction.reply('Espri getirilirken bir hata oluştu.');
        }
    },
};