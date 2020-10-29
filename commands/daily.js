const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (client, message, args) => {
    
    let user = message.author;

    let timeout = 86400000;

    let daily = await db.fetch(`daily_${message.guild.id}_${user.id}`);
    
    let amount = Math.floor(Math.random() * 10000) + 1000;
    
    if (daily !== null && timeout - (Date.now() - daily) > 0) {
        let time = ms(timeout - (Date.now() - daily));
  
        let timeEmbed = new Discord.MessageEmbed()
        .setColor("#008000")
        .setDescription(`:no_entry_sign: **|** Você já recebeu sua recompensa diária!\n\nColete novamente daqui a **${time.hours}h ${time.minutes}m ${time.seconds}s**`);
            
        message.channel.send(`${user}`, timeEmbed);

    } else {
        let moneyEmbed = new Discord.MessageEmbed()
        .setTitle(":dollar: **|** Recompensa Diária")
        .setColor("#008000")
        .setDescription(`Você coletou sua recompensa diária!\n\n :dollar: Dinheiro Coletado: **\`R$${amount}\`**`);
        
        message.channel.send(`${user}`, moneyEmbed);
        db.add(`money_${message.guild.id}_${user.id}`, amount);
        db.set(`daily_${message.guild.id}_${user.id}`, Date.now());
    }
}