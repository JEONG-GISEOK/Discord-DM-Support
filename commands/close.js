const { SlashCommandBuilder } = require('@discordjs/builders');
const { categoryID, ticketCloseMessage, footer } = require('../config')
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('문의종료')
        .setDescription('현재 진행중인 문의를 종료합니다.'),
    async execute(interaction) {
        if(!interaction.channel.topic) return;
        if(interaction.channel.parent.id !== categoryID) return;
        const user = await interaction.client.users.fetch(interaction.channel.topic)
        const embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTimestamp()
            .setThumbnail("https://cdn.discordapp.com/attachments/1174987952846278746/1174993874050109450/logo.png?ex=65699d51&is=65572851&hm=3bed7919fb1007ee72fe19b24d8e77e5a87aa1be4613bb6801ed0c0f94e346f0&")
            .setAuthor(`${interaction.user.tag}`, `${interaction.user.displayAvatarURL()}`)
            .setDescription(`${ticketCloseMessage}`)
            .setFooter(`${footer}`)
        user.send({ embeds: [embed] })
        interaction.channel.delete()
    },
};
