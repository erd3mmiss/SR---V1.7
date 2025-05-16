const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('yardım')
        .setDescription('Komutları kategorilere ayrılmış şekilde listeler.'),
    async execute(interaction) {
        const yardımEmbed = new EmbedBuilder()
            .setColor('#7289DA')
            .setTitle('Yardım - Komut Listesi')
            .setDescription('Aşağıda botun farklı kategorilerdeki komutları listelenmiştir:')
            .addFields(
                {
                    name: '⚙️ Moderasyon',
                    value: '/rol-ver [kullanıcı] [rol]\n/rol-al [kullanıcı] [rol]',
                    inline: false,
                },
                {
                    name: '✨ Genel',
                    value: '/yardım\n/yardım-muzik\n/yardım-genel',
                    inline: false,
                },
                {
                    name: ' eğlence',
                    value: '/zar-at [sayı (isteğe bağlı)]\n/yazı-tura\n/rastgele-sayı [min] [max]\n/anket [soru] [seçenek1] [seçenek2] ...\n/espri\n/espri-internet\n/meme\n/8top',
                    inline: false,
                },
            )
            .setFooter({ text: `${interaction.client.user.username} tarafından istendi`, iconURL: interaction.client.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

        await interaction.reply({ embeds: [yardımEmbed], ephemeral: true });
    },
};