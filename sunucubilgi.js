const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sunucu-bilgi')
        .setDescription('Mevcut sunucu hakkında bilgi gösterir.'),
    async execute(interaction) {
        const sunucu = interaction.guild;
        const olusturmaTarihi = moment(sunucu.createdTimestamp).format('D MMMM YYYY, HH:mm');
        const uyeSayisi = sunucu.memberCount;
        const botSayisi = sunucu.members.cache.filter(member => member.user.bot).size;
        const kanalSayisi = sunucu.channels.cache.size;
        const metinKanalSayisi = sunucu.channels.cache.filter(channel => channel.type === 0).size;
        const sesKanalSayisi = sunucu.channels.cache.filter(channel => channel.type === 2).size;
        const rolSayisi = sunucu.roles.cache.size;
        const boostSeviyesi = sunucu.premiumTier > 0 ? `Seviye ${sunucu.premiumTier}` : 'Yok';
        const boostSayisi = sunucu.premiumSubscriptionCount || 0;
        const sahibi = await sunucu.fetchOwner();

        const bilgiEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`${sunucu.name} Bilgileri`)
            .setThumbnail(sunucu.iconURL({ dynamic: true, size: 512 }))
            .addFields(
                { name: 'Sunucu Adı', value: sunucu.name },
                { name: 'ID', value: sunucu.id },
                { name: 'Oluşturulma Tarihi', value: olusturmaTarihi },
                { name: 'Sahibi', value: sahibi.tag },
                { name: `Üye Sayısı (${uyeSayisi})`, value: `Kullanıcılar: ${uyeSayisi - botSayisi}\nBotlar: ${botSayisi}` },
                { name: `Kanal Sayısı (${kanalSayisi})`, value: `Metin: ${metinKanalSayisi}\nSes: ${sesKanalSayisi}` },
                { name: `Rol Sayısı`, value: `${rolSayisi}` },
                { name: 'Boost Seviyesi', value: boostSeviyesi },
                { name: 'Boost Sayısı', value: `${boostSayisi}` },
            )
            .setTimestamp()
            .setFooter({ text: `${interaction.client.user.username} tarafından`, iconURL: interaction.client.user.displayAvatarURL({ dynamic: true }) });

        await interaction.reply({ embeds: [bilgiEmbed] });
    },
};