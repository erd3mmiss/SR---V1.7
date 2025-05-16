const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kullanıcı-bilgi')
        .setDescription('Belirtilen kullanıcının veya kendi bilgilerini gösterir.')
        .addUserOption(option =>
            option.setName('kullanıcı')
                .setDescription('Bilgilerini görmek istediğiniz kullanıcıyı etiketleyin (isteğe bağlı).')
                .setRequired(false)),
    async execute(interaction) {
        const hedefKullanici = interaction.options.getUser('kullanıcı') || interaction.user;
        const hedefUye = await interaction.guild.members.fetch(hedefKullanici.id);

        const katilmaTarihi = moment(hedefUye.joinedTimestamp).format('D MMMM YYYY, HH:mm');
        const olusturmaTarihi = moment(hedefKullanici.createdTimestamp).format('D MMMM YYYY, HH:mm');
        const botMu = hedefKullanici.bot ? 'Evet' : 'Hayır';
        const roller = hedefUye.roles.cache
            .filter(role => role.id !== interaction.guild.id)
            .map(role => role.name)
            .join(', ') || 'Yok';

        const bilgiEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`${hedefKullanici.tag} Bilgileri`)
            .setThumbnail(hedefKullanici.displayAvatarURL({ dynamic: true, size: 512 }))
            .addFields(
                { name: 'ID', value: hedefKullanici.id },
                { name: 'Kullanıcı Adı', value: hedefKullanici.username },
                { name: 'Bot Mu?', value: botMu },
                { name: 'Hesap Oluşturulma Tarihi', value: olusturmaTarihi },
                { name: 'Sunucuya Katılma Tarihi', value: katilmaTarihi },
                { name: `Roller (${hedefUye.roles.cache.size - 1})`, value: roller },
            )
            .setTimestamp()
            .setFooter({ text: `${interaction.guild.name} sunucusunda`, iconURL: interaction.guild.iconURL({ dynamic: true }) });

        await interaction.reply({ embeds: [bilgiEmbed] });
    },
};