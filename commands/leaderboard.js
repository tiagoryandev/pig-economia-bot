const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (client, message, args) => {
    
    let bank = db.all().filter(data => data.ID.startsWith(`bank_${message.guild.id}`)).sort((a, b) => b.data - a.data); // O rank é melhor classificando pelo saldo do banco
    let bank1;
    
    if(bank.length > 10){
        bank1 = 10
    }else{
        bank1 = bank.length
    
    }
    let content = "";

    for (let i = 0; i < bank1; i++) {
        let user = client.users.cache.get(bank[i].ID.split('_')[2]).tag;

        content += `${i+1}º **\`${user}\`** - **R$${bank[i].data}**\n`
    }

    const embed = new Discord.MessageEmbed()
    .setTitle(`💵 **|** Rank Monetário - ${message.guild.name}`)
    .setDescription(content)
    .setColor(2686950)
    .setFooter(`Rank Monetário do Servidor!`)
    .setTimestamp();

    message.channel.send(`${message.author}`, embed);
}   
