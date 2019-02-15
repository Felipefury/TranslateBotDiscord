var http = require('http');
const Discord = require('discord.js');
const client = new Discord.Client();
 
var fromLang = "en";
var toLang = "pt";
var clientId = "FREE_TRIAL_ACCOUNT";
var clientSecret = "PUBLIC_SECRET";


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
 
client.on('message', message => {
    if(message.author.bot) return
    if(message.channel.id == 'ID DO CANAL') {
    text = message.content

    var jsonPayload = JSON.stringify({
        fromLang: fromLang,
        toLang: toLang,
        text: text
    });

    var options = {
        hostname: "api.whatsmate.net",
        port: 80,
        path: "/v1/translation/translate",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-WM-CLIENT-ID": clientId,
            "X-WM-CLIENT-SECRET": clientSecret,
            "Content-Length": Buffer.byteLength(jsonPayload)
        },
        json: true,
    };

    var request = new http.ClientRequest(options);
    request.end(jsonPayload);
    
    request.on('response', function (response) {
        console.log('Status code: ' + response.statusCode);
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
            console.log(text + " -> " + chunk);

            if(text == chunk) return

            const embed = new Discord.RichEmbed()
            .setTitle("Criado por Felipe GM")
            .setAuthor("TranslateBOT", "https://cdn.discordapp.com/avatars/319606741639757824/9de3604b01582ad852d586c29cfdd7d0.jpg?size=1024")
            .setColor(0x00AE86)

            .addField("Original, en: ",text)
            .setTimestamp()
            .addField("Tradução pt: ",chunk)
            .setFooter("Pedido: " + message.author.username, message.author.avatarURL)
            message.channel.send({embed});
        });
    });

    }
})
//API COM TODAS OS IDIOMAS SUPORTADOS http://api.whatsmate.net/v1/translation/supported-codes
client.login("TOKEN");
