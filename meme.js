const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('İnternetten rastgele bir meme getirir.'),
    async execute(interaction) {
        try {
            const response = await fetch('https://meme-api.com/gimme');
            const data = await response.json();

            if (data.url) {
                const memeEmbed = new EmbedBuilder()
                    .setColor('#ff9900')
                    .setTitle(data.title)
                    .setImage(data.url)
                    .setFooter({ text: `r/${data.subreddit} tarafından gönderildi` });

                await interaction.reply({ embeds: [memeEmbed] });
            } else {
                await interaction.reply('Meme getirilirken bir hata oluştu.');
            }
        } catch (error) {
            console.error('Meme getirilirken hata:', error);
            await interaction.reply('Meme getirilirken bir hata oluştu.');
        }
    },
};