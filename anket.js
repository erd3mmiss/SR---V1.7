const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('anket')
        .setDescription('Belirtilen soru ve seçeneklerle bir anket oluşturur.')
        .addStringOption(option =>
            option.setName('soru')
                .setDescription('Anket sorusunu girin.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('seçenek1')
                .setDescription('İlk anket seçeneğini girin.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('seçenek2')
                .setDescription('İkinci anket seçeneğini girin.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('seçenek3')
                .setDescription('Üçüncü anket seçeneğini girin (isteğe bağlı).')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('seçenek4')
                .setDescription('Dördüncü anket seçeneğini girin (isteğe bağlı).')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('seçenek5')
                .setDescription('Beşinci anket seçeneğini girin (isteğe bağlı).')
                .setRequired(false)),
    async execute(interaction) {
        const soru = interaction.options.getString('soru');
        const seçenekler = [];
        for (let i = 1; i <= 5; i++) {
            const seçenek = interaction.options.getString(`seçenek${i}`);
            if (seçenek) {
                seçenekler.push(seçenek);
            }
        }

        if (seçenekler.length < 2) {
            return await interaction.reply({ content: 'Lütfen en az iki seçenek belirtin.', ephemeral: true });
        }

        const emojiList = ['🇦', '🇧', '🇨', '🇩', '🇪'];
        let anketMetni = `**${soru}**\n\n`;
        for (let i = 0; i < seçenekler.length; i++) {
            anketMetni += `${emojiList[i]} ${seçenekler[i]}\n`;
        }

        const anketEmbed = new EmbedBuilder()
            .setColor('#a020f0')
            .setTitle('Yeni Anket!')
            .setDescription(anketMetni)
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

        const anketMesajı = await interaction.reply({ embeds: [anketEmbed], fetchReply: true });

        for (let i = 0; i < seçenekler.length; i++) {
            await anketMesajı.react(emojiList[i]);
        }
    },
};