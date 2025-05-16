const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Belirtilen kullanıcıyı sunucudan atar.')
        .addUserOption(option =>
            option.setName('kullanıcı')
                .setDescription('Atmak istediğiniz kullanıcıyı etiketleyin.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('sebep')
                .setDescription('Atılma nedenini belirtin (isteğe bağlı).')
                .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .setDMPermission(false),
    async execute(interaction) {
        const hedefKullanici = interaction.options.getUser('kullanıcı');
        const atilmaNedeni = interaction.options.getString('sebep') || 'Belirtilmedi';
        const hedefUye = await interaction.guild.members.fetch(hedefKullanici.id);

        if (!hedefUye) {
            return await interaction.reply({ content: 'Bu kullanıcı sunucuda bulunmuyor.', ephemeral: true });
        }

        if (hedefUye.id === interaction.user.id) {
            return await interaction.reply({ content: 'Kendinizi atamazsınız.', ephemeral: true });
        }

        if (hedefUye.permissions.has(PermissionFlagsBits.Administrator) || hedefUye.permissions.has(PermissionFlagsBits.KickMembers)) {
            return await interaction.reply({ content: 'Bu kullanıcıyı atma yetkiniz yok.', ephemeral: true });
        }

        try {
            await hedefUye.kick(atilmaNedeni);
            await interaction.reply({ content: `${hedefKullanici.tag} adlı kullanıcı, ${atilmaNedeni} nedeniyle atıldı.`, ephemeral: true });
        } catch (error) {
            console.error('Kullanıcı atılırken hata:', error);
            await interaction.reply({ content: 'Kullanıcı atılırken bir hata oluştu.', ephemeral: true });
        }
    },
};