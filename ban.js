const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Belirtilen kullanıcıyı sunucudan yasaklar.')
        .addUserOption(option =>
            option.setName('kullanıcı')
                .setDescription('Yasaklamak istediğiniz kullanıcıyı etiketleyin.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('sebep')
                .setDescription('Yasaklama nedenini belirtin (isteğe bağlı).')
                .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers) // Bu komutu kullanabilecek varsayılan izinler
        .setDMPermission(false), // Komutun DM'lerde kullanılamamasını sağlar
    async execute(interaction) {
        const hedefKullanici = interaction.options.getUser('kullanıcı');
        const yasaklamaNedeni = interaction.options.getString('sebep') || 'Belirtilmedi';
        const hedefUye = await interaction.guild.members.fetch(hedefKullanici.id);

        if (!hedefUye) {
            return await interaction.reply({ content: 'Bu kullanıcı sunucuda bulunmuyor.', ephemeral: true });
        }

        if (hedefUye.id === interaction.user.id) {
            return await interaction.reply({ content: 'Kendinizi yasaklayamazsınız.', ephemeral: true });
        }

        if (hedefUye.permissions.has(PermissionFlagsBits.Administrator) || hedefUye.permissions.has(PermissionFlagsBits.BanMembers)) {
            return await interaction.reply({ content: 'Bu kullanıcıyı yasaklama yetkiniz yok.', ephemeral: true });
        }

        try {
            await hedefUye.ban({ reason: yasaklamaNedeni });
            await interaction.reply({ content: `${hedefKullanici.tag} adlı kullanıcı, ${yasaklamaNedeni} nedeniyle yasaklandı.`, ephemeral: true });
        } catch (error) {
            console.error('Kullanıcı yasaklanırken hata:', error);
            await interaction.reply({ content: 'Kullanıcı yasaklanırken bir hata oluştu.', ephemeral: true });
        }
    },
};