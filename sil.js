const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sil')
        .setDescription('Belirtilen sayıda mesajı kanaldan siler.')
        .addIntegerOption(option =>
            option.setName('sayı')
                .setDescription('Silinecek mesaj sayısını girin (1-100).')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('sebep')
                .setDescription('Silme nedenini belirtin (isteğe bağlı).')
                .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .setDMPermission(false),
    async execute(interaction) {
        const silinecekSayi = interaction.options.getInteger('sayı');
        const silmeNedeni = interaction.options.getString('sebep') || 'Belirtilmedi';

        if (silinecekSayi < 1 || silinecekSayi > 100) {
            return await interaction.reply({ content: 'Lütfen 1 ile 100 arasında bir sayı girin.', ephemeral: true });
        }

        try {
            await interaction.channel.bulkDelete(silinecekSayi, true);
            await interaction.reply({ content: `${silinecekSayi} adet mesaj, ${silmeNedeni} nedeniyle silindi.`, ephemeral: true });
        } catch (error) {
            console.error('Mesajlar silinirken hata:', error);
            await interaction.reply({ content: 'Mesajlar silinirken bir hata oluştu. Botun ve sizin mesajları yönetme yetkinizin olduğundan emin olun.', ephemeral: true });
        }
    },
};