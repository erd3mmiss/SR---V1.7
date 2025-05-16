const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rol-al')
        .setDescription('Belirtilen kullanıcıdan belirtilen rolü alır.')
        .addUserOption(option =>
            option.setName('kullanıcı')
                .setDescription('Rolünü almak istediğiniz kullanıcıyı etiketleyin.')
                .setRequired(true))
        .addRoleOption(option =>
            option.setName('rol')
                .setDescription('Almak istediğiniz rolü seçin.')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        .setDMPermission(false),
    async execute(interaction) {
        const hedefKullanici = interaction.options.getUser('kullanıcı');
        const alinacakRol = interaction.options.getRole('rol');
        const hedefUye = await interaction.guild.members.fetch(hedefKullanici.id);

        if (!hedefUye) {
            return await interaction.reply({ content: 'Bu kullanıcı sunucuda bulunmuyor.', ephemeral: true });
        }

        if (!hedefUye.roles.cache.has(alinacakRol.id)) {
            return await interaction.reply({ content: `${hedefKullanici.tag} adlı kullanıcı bu role sahip değil.`, ephemeral: true });
        }

        try {
            await hedefUye.roles.remove(alinacakRol);
            await interaction.reply({ content: `${hedefKullanici.tag} adlı kullanıcıdan "${alinacakRol.name}" rolü alındı.`, ephemeral: true });
        } catch (error) {
            console.error('Rol alınırken hata:', error);
            await interaction.reply({ content: 'Rol alınırken bir hata oluştu. Botun ve sizin rolleri yönetme yetkinizin olduğundan emin olun.', ephemeral: true });
        }
    },
};