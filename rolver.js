const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rol-ver')
        .setDescription('Belirtilen kullanıcıya belirtilen rolü verir.')
        .addUserOption(option =>
            option.setName('kullanıcı')
                .setDescription('Rol vermek istediğiniz kullanıcıyı etiketleyin.')
                .setRequired(true))
        .addRoleOption(option =>
            option.setName('rol')
                .setDescription('Vermek istediğiniz rolü seçin.')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        .setDMPermission(false),
    async execute(interaction) {
        const hedefKullanici = interaction.options.getUser('kullanıcı');
        const verilecekRol = interaction.options.getRole('rol');
        const hedefUye = await interaction.guild.members.fetch(hedefKullanici.id);

        if (!hedefUye) {
            return await interaction.reply({ content: 'Bu kullanıcı sunucuda bulunmuyor.', ephemeral: true });
        }

        if (hedefUye.roles.cache.has(verilecekRol.id)) {
            return await interaction.reply({ content: `${hedefKullanici.tag} adlı kullanıcı zaten bu role sahip.`, ephemeral: true });
        }

        try {
            await hedefUye.roles.add(verilecekRol);
            await interaction.reply({ content: `${hedefKullanici.tag} adlı kullanıcıya "${verilecekRol.name}" rolü verildi.`, ephemeral: true });
        } catch (error) {
            console.error('Rol verilirken hata:', error);
            await interaction.reply({ content: 'Rol verilirken bir hata oluştu. Botun ve sizin rolleri yönetme yetkinizin olduğundan emin olun.', ephemeral: true });
        }
    },
};