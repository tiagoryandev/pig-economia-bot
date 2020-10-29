/*
		Esse é o código é para Bots de Economia, usando uma biblioteca muito simples de usar,
	caso você use esse código no seu Bot, você pode usar, mais lembre que esse código é para ajudar 
	usuários com essa biblioteca. Lembrando que a Economia usada nesse código, não é global.
		Caso queira entrar em contato com o Autor do código, você pode entrar no meu servidor no Discord, e
	testar a minha Aplicação no Discord, com o nome Mizuhara um Bot de Diversão, Social, Moderação, Utilidades e NSFW.


	Autor: Tia#1000
	Website: https://www.mizuhara.tk/
	Twitter: @BotMizuhara
  Meu Servidor: https://discord.gg/QraTZUq
  
	Obrigado por ler meu código! <3
*/

const Discord = require("discord.js");
const db = require("quick.db");
const client = new Discord.Client();
const config = require("./config.json");

client.on('message', message => {
	if (message.author.bot) {
		return;
	};
	if (message.channel.type == 'dm') {
		return;
	};
	if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) {
		return;
	};
	if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) {
		return;
	};

    const args = message.content.trim().slice(config.prefix.length).split(/ +/g);

    const command = args.shift().toLowerCase();

    try {
	    const commandFile = require(`./commands/${command}.js`)
	    commandFile.run(client, message, args); 
    } catch (err) {
        console.error(`[ERRO] Ocorreu um erro ao executar o comando:\n${err}`);
    };
});

client.on("guildMemberRemove", (member) => {
	db.delete(`money_${member.guild.id}_${member.id}`); 
	db.delete(`bank_${member.guild.id}_${member.id}`); 
	db.delete(`work_${member.guild.id}_${member.id}`); 
	db.delete(`daily_${member.guild.id}_${member.id}`); 
	db.delete(`rob_${member.guild.id}_${member.id}`); 

	console.log(`[ECONOMIA] O ${member.tag} saiu do servidor ${member.guild.name}, e teve todos os Status de Economia removidos!`);
})

client.login(config.token); 