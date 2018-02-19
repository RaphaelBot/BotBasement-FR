const Discord = require("discord.js");
const client = new Discord.Client();
var prefix = "m-"
let type = 1;
//client est prêt
client.on("ready", () => {
console.log('___\nAllumage ou Reboot réussi !\n___\nC\'est allumé ! Le Bots-list va continuer')
client.user.setPresence({game: { name: "#bots-list || BotsB FR", url: "https://www.twitch.tv/pafad0gaming",type}})
});
//join
client.on("guildMemberAdd", member => {
    client.channels.get("414429834689773580").send(`Bienvenue sur le serveur ${member} amuses toi bien !`)
})
//leave
client.on("guildMemberRemove", member =>{
    client.channels.get("414429834689773580").send(`${member} a quitté le serveur !`)
})
//début des commandes
client.on('message', message => {
    if(!message.content.startsWith(prefix))return;
  // This is the best way to define args. Trust me.
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // The list of if/else is replaced with those simple 2 lines:
  try {
    let commandFile = require(`./commandes/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err){
  return;
  }
//support
if (message.content === prefix + "support"){
        if (!args) return message.channel.send("** ❌ | Merci de me dire le bug ou la question**");
            message.channel.send("**☑ Votre report a été envoyé** : " + args)
            var support_embed = new Discord.RichEmbed()
            .setTitle(message.author.username + "#" + message.author.discriminator)
            .setColor('#002AD1')
            .setAuthor("Support du bot")
            .setDescription("***Question/bug donné:***\n\n" + args)
            .setThumbnail(message.author.displayAvatarURL)
        client.channels.get("414592429161840663").send(support_embed)
}
//test
if(message.content === prefix + "test") {
message.reply('Je suis reveillé !') 
}
//api
if(message.content.startsWith === prefix + "api") {
message.channel.send(client.ping + "ms") 
}
//logs
if(message.content.startsWith(prefix + "logs")) {

}
//setavatar
if(message.content.startsWith(prefix + "setavatar")){
    if(message.author.id === "317221808405348364" || message.author.id === "169146903462805504" || message.author.id === "306119836503900161"){
        if (!args) return message.channel.send("** ❌ | Vous n'avez rien noté.**");
            message.delete();
            client.user.setAvatar(args);
            message.channel.send("** :white_check_mark: | Avatar changé !**").catch(console.error)
        }else{
        message.channel.send(`:x: | ${message.author} tu n'est pas dans le support du bot.`)
        return;
        }
    }
    if(message.content.startsWith(prefix + "setgame")){
        if(message.author.id === "317221808405348364" || message.author.id === "169146903462805504" || message.author.id === "306119836503900161"){
            if (!args) return message.channel.send("** ❌ | Vous n'avez rien noté.**");
                message.delete();
                client.user.setPresence({game:{name: `#bot-list || ${args}`, url:"https://www.twitch.tv/pafad0gaming",type}});
                message.channel.send("** :white_check_mark: | Jeu changé !**").catch(console.error)
            }else{
            message.channel.send(`:x: | ${message.author} tu n'est pas dans le support du bot.`)
            return;
            }
        }
    //setpseudo
        if(message.content === prefix + "setpseudo"){
            if(message.author.id === "317221808405348364" || message.author.id === "169146903462805504" || message.author.id === "306119836503900161"){
                if (!args) return message.channel.send("** ❌ | Vous n'avez rien noté.**");
                    message.delete();
                    client.user.setUsername(`${args}`)
                    message.channel.send("** :white_check_mark: | Pseudo changé !**").catch(console.error)
                }else{
                message.channel.send(`:x: | ${message.author} tu n'est pas dans le support du bot.`)
                return;
                }
            }
            //reload
            if(message.content === prefix + "reload"){
            if(message.author.id === "317221808405348364" || message.author.id === "169146903462805504" || message.author.id === "306119836503900161"){
                message.channel.send("** :white_check_mark: | mise à jour...**")    
                client.destroy();
                console.log("déco")
                client.login(process.env.Discord_token || process.agrv[2]);
                console.log("reco")
                message.channel.send("** :white_check_mark: | mise à jour terminée...**")
                }else{
                message.channel.send(`:x: | ${message.author} tu n'est pas dans le support du bot.`)
                return;
                }
        }
    
});
client.login(process.env.Discord_token || process.agrv[2]);
