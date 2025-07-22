const Discord = require('discord.js');
const client  = new Discord.Client({
    intents: 4609,
    partials: ['CHANNEL']
});
const { token, serverID, categoryID, footer } = require('./config.js')
const fs = require('fs')
client.commands = new Discord.Collection();
const { Routes } = require('discord-api-types/v9');
const commandFolders = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const { REST } = require('@discordjs/rest');
let guild
let categoryChannel
const commands = [];
for (const file of commandFolders) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());  
    client.commands.set(command.data.name, command);
    
}



client.on('ready', async () => {
    console.log('정상실행.')


    guild = await client.guilds.fetch(serverID)
    categoryChannel = await guild.channels.fetch(categoryID)
    const rest = new REST({ version: '9' }).setToken(token);

    (async () => {
        try {
            await rest.put(
                Routes.applicationGuildCommands(client.user.id, serverID),
                { body: commands },
            );

            console.log('슬래쉬 커맨드가 푸쉬되었습니다.');
        } catch (error) {
            console.error(error);
        }
    })();

})

function sendMessage(message, channel, colour) {
    let attachments = [];
    if(message.attachments.size > 0) {
        message.attachments.forEach(curr => {
            attachments.push(new Discord.MessageAttachment(curr.attachment))
        })
    }
    const embed = new Discord.MessageEmbed()
        .setColor(colour)
        .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
        .setDescription(`${message.content}`)
        .setFooter(`${footer}`)
        channel.send({ embeds: [embed], files: attachments})
    message.react('✅')
}


client.on('messageCreate', async(message) => {
    if(message.author.bot) return;
    if(message.channel.type === 'DM') {
        const isOpen = categoryChannel.children.filter(x => x.topic === message.author.id)
        
        if(!isOpen.first()) {
            const chann = await guild.channels.create(`${message.author.username}`, {
                type: 'GUILD_TEXT',
                parent: categoryChannel,
                topic: `${message.author.id}`
            })
            
            sendMessage(message, chann, 'GREEN')

            const embedUser = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setAuthor('👋ㆍ안녕하세요. 보내주신 문의내용이 관리자에게 전달되었습니다.')
                .setDescription(`**문의내용 : **\n\`\`\`${message.content}\`\`\`\n**더 하실말씀이 있다면 편하게 작성해주세요!\n실수로 문의를 했다면 '실수입니다' 라고 작성해주세요 !**`)
                .setFooter(`${footer}`)

            message.channel.send({ embeds: [embedUser]})
        }
        else {
            sendMessage(message, isOpen.first(), 'GREEN')
            
        }
    }
    else if(message.channel.type === 'GUILD_TEXT') {
        if(!message.channel.topic) return;
        if(message.channel.parent.id !== categoryID) return;
        const user = await client.users.fetch(message.channel.topic)
        if(!user) return message.reply({ content: '권한이 부족하거나 오류가 발생했습니다!'});
        sendMessage(message, user, 'GREEN')
    }
})

client.on('interactionCreate', async(interaction) => {
if(interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (!command) return;
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: '> **오류가 발생했습니다. 관리자에게 문의하세요.**', ephemeral: true });
        }
    }
})

client.login(token)
