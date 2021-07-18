const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (client, message, args) => {
    let user = message.author
    let money = db.all().filter(data => data.ID.startsWith(`bank_${message.guild.id}_${user.id}`)).sort((a, b) => b.data - a.data); // O rank é melhor classificando pelo saldo do banco
    let money1;
    
    if(money.length > 10){
        money1 = 10
    }else{
        money1 = money.length
    
    }
    let content = "";

    for (let i = 0; i < money1; i++) {
        let user = client.users.cache.get(money[i].ID.split('_')[2]).tag;

        content += `${i+1}º **\`${user}\`** - **R$${money[i].data}**\n`
    }

    const embed = new Discord.MessageEmbed()
    .setTitle(`💵 **|** Rank Monetário - ${message.guild.name}`)
    .setDescription(content)
    .setColor(2686950)
    .setFooter(`Rank Monetário do Servidor!`)
    .setTimestamp();

    message.channel.send(`${message.author}`, embed);
}   
