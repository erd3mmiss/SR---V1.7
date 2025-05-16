const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('susturma-kaldır')
        .setDescription('Belirtilen kullanıcının sunucudaki susturmasını kaldırır.')
        .addUserOption(option =>
            option.setName('kullanıcı')
                .setDescription('Susturması kaldırılacak kullanıcıyı etiketleyin.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('sebep')
                .setDescription('Susturmanın kaldırılma nedenini belirtin (isteğe bağlı).')
                .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
        .setDMPermission(false),
    async execute(interaction) {
        const hedefKullanici = interaction.options.getUser('kullanıcı');
        const kaldirmaNedeni = interaction.options.getString('sebep') || 'Belirtilmedi';
        const hedefUye = await interaction.guild.members.fetch(hedefKullanici.id);

        if (!hedefUye) {
            return await interaction.reply({ content: 'Bu kullanıcı sunucuda bulunmuyor.', ephemeral: true });
        }

        if (!hedefUye.isCommunicationDisabled()) {
            return await interaction.reply({ content: 'Bu kullanıcının zaten susturması kaldırılmış.', ephemeral: true });
        }

        try {
            await hedefUye.timeout(null, kaldirmaNedeni);
            await interaction.reply({ content: `${hedefKullanici.tag} adlı kullanıcının susturması kaldırıldı. Neden: ${kaldirmaNedeni}`, ephemeral: true });
        } catch (error) {
            console.error('Kullanıcının susturması kaldırılırken hata:', error);
            await interaction.reply({ content: 'Kullanıcının susturması kaldırılırken bir hata oluştu.', ephemeral: true });
        }
    },
};