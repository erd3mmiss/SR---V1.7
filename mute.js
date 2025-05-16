const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const ms = require('ms'); // Süreleri kolayca çevirmek için bir kütüphane (npm install ms)

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sustur')
        .setDescription('Belirtilen kullanıcıyı sunucuda susturur.')
        .addUserOption(option =>
            option.setName('kullanıcı')
                .setDescription('Susturmak istediğiniz kullanıcıyı etiketleyin.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('süre')
                .setDescription('Susturma süresini belirtin (örneğin 10s, 1m, 1h).')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('sebep')
                .setDescription('Susturma nedenini belirtin (isteğe bağlı).')
                .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
        .setDMPermission(false),
    async execute(interaction) {
        const hedefKullanici = interaction.options.getUser('kullanıcı');
        const susturmaSuresi = interaction.options.getString('süre');
        const susturmaNedeni = interaction.options.getString('sebep') || 'Belirtilmedi';
        const hedefUye = await interaction.guild.members.fetch(hedefKullanici.id);
        const sureMs = ms(susturmaSuresi);

        if (!hedefUye) {
            return await interaction.reply({ content: 'Bu kullanıcı sunucuda bulunmuyor.', ephemeral: true });
        }

        if (hedefUye.id === interaction.user.id) {
            return await interaction.reply({ content: 'Kendinizi susturamazsınız.', ephemeral: true });
        }

        if (hedefUye.permissions.has(PermissionFlagsBits.Administrator) || hedefUye.permissions.has(PermissionFlagsBits.MuteMembers)) {
            return await interaction.reply({ content: 'Bu kullanıcıyı susturma yetkiniz yok.', ephemeral: true });
        }

        if (!sureMs || sureMs <= 0) {
            return await interaction.reply({ content: 'Geçersiz bir süre girdiniz. Lütfen geçerli bir süre formatı kullanın (örneğin 10s, 1m, 1h).', ephemeral: true });
        }

        try {
            await hedefUye.timeout(sureMs, susturmaNedeni);
            await interaction.reply({ content: `${hedefKullanici.tag} adlı kullanıcı ${susturmaSuresi} boyunca susturuldu. Neden: ${susturmaNedeni}`, ephemeral: true });
        } catch (error) {
            console.error('Kullanıcı susturulurken hata:', error);
            await interaction.reply({ content: 'Kullanıcı susturulurken bir hata oluştu.', ephemeral: true });
        }
    },
};