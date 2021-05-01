const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (client, message, args) => {
    let autor = message.author;
    
    let user = message.mentions.users.first();
    
    if(!user) {
        return message.channel.send(`🚫 **|** ${autor}, você tem que mencionar um membro para realizar seu roubo!`);
    };

    if(user.id == autor.id){
        return message.channel.send(`🚫 **|** ${autor}, você não pode se auto-roubar!`);
    };

    let user_money = await db.fetch(`money_${message.guild.id}_${user.id}`)
    if(user_money == null) user_money = 0;

    let autor_money = await db.fetch(`money_${message.guild.id}_${autor.id}`)
    if(autor_money == null) autor_money = 0;
        
    if(user_money <= 0) {
        return message.channel.send(`🚫 **|** ${autor}, você não pode roubar alguem que não possui dinheiro!`);
    };

    let timeout = 86400000;

    let daily = await db.fetch(`rob_${message.guild.id}_${autor.id}`);

    if (daily !== null && timeout - (Date.now() - daily) > 0) {

        let time = ms(timeout - (Date.now() - daily));
  
        let timeEmbed = new Discord.MessageEmbed()
        .setColor("#008000")
        .setDescription(`🚫 **|** Você já realizou um roubo hoje!\n\nColete novamente daqui a **${time.hours}h ${time.minutes}m ${time.seconds}s**`);
        
        message.channel.send(`${autor}`, timeEmbed);
    } else {
        
        let sorte = Math.floor(Math.random() * 4) + 1;
        
        if(sorte == 2) {
            
            let amount = Math.floor(Math.random() * autor_money) + 1;
            
            let moneyEmbed = new Discord.MessageEmbed()
            .setTitle("👮 **|** Preso por Roubo")
            .setColor("RED")
            .setDescription(`Você realizou um roubo e não se saiu muito bem!\nE você perdeu um total de **R$${amount}**!`);
           
            message.channel.send(`${autor}`, moneyEmbed);
            db.subtract(`money_${message.guild.id}_${autor.id}`, amount);
            db.set(`rob_${message.guild.id}_${autor.id}`, Date.now());
        }else{
            
            let amount = Math.floor(Math.random() * user_money) + 1;
            
            let moneyEmbed = new Discord.MessageEmbed()
            .setTitle("🔫 **|** Roubo Realizado")
            .setColor("GREEN")
            .setDescription(`Você roubou o ${user}!\nE você conseguiu uma quantia de **R$${amount}**!`);
            
            message.channel.send(`${autor}`, moneyEmbed);
            db.subtract(`money_${message.guild.id}_${user.id}`, amount);
            db.add(`money_${message.guild.id}_${autor.id}`, amount);
            db.set(`rob_${message.guild.id}_${autor.id}`, Date.now());
        };
    };
}
