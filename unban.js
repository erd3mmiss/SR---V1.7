const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Belirtilen kullanıcının sunucudaki yasağını kaldırır.')
        .addStringOption(option =>
            option.setName('kullanıcı_id')
                .setDescription('Yasağı kaldırılacak kullanıcının ID\'sini girin.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('sebep')
                .setDescription('Yasağın kaldırılma nedenini belirtin (isteğe bağlı).')
                .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDMPermission(false),
    async execute(interaction) {
        const kullaniciId = interaction.options.getString('kullanıcı_id');
        const unbanNedeni = interaction.options.getString('sebep') || 'Belirtilmedi';

        try {
            await interaction.guild.members.unban(kullaniciId, unbanNedeni);
            await interaction.reply({ content: `<@${kullaniciId}> adlı kullanıcının yasağı, ${unbanNedeni} nedeniyle kaldırıldı.`, ephemeral: true });
        } catch (error) {
            console.error('Kullanıcının yasağı kaldırılırken hata:', error);
            await interaction.reply({ content: 'Kullanıcının yasağı kaldırılırken bir hata oluştu. Lütfen kullanıcı ID\'sinin doğru olduğundan emin olun.', ephemeral: true });
        }
    },
};