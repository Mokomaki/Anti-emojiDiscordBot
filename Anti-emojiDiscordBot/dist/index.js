"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const ConfigFile = require("./config");
var jimp = require('jimp');
const client = new Discord.Client();

client.on("ready", () => 
{
    client.user.setPresence(
    {
        game: 
        {
            name: 'you suffer',
            type: "WATCHING",
        }
    });
    console.log("ready");
});

client.on("message", msg => 
{
    if (msg.content.includes("<:")||msg.content.includes("<a:"))    //if the message contains an emoji
    {
        const embed = new Discord.RichEmbed();

        console.log("====================");
        console.log(msg.author.username + " said: " + msg.content);
        
        var id;
        for(var i = 0; i < msg.content.length;i++) //parse the emojis id out of the message
        {
            if(i>0)
            {
                if((msg.content.charAt(i)>= '0' && msg.content.charAt(i) <= '9')&&msg.content.charAt(i-1)==':')
                {
                    id = msg.content.substring(i,i+18);
                }
                
            }
        }

        var images = 
        [
            ('no.png'),                                         //Red Circle
            ('https://cdn.discordapp.com/emojis/' + id + '.png')//The emoji from the message
        ];
        var jimps = [];

        for(var i = 0; i< images.length; i++)   //pushes the images to jimps
        {
            jimps.push(jimp.read(images[i]));
        }

        Promise.all(jimps).then(function(data)
        {
            return Promise.all(jimps);
        }).then(function(data)
        {                                       //composite the red circle on top of the emoji used
            data[1].composite(data[0],(data[1].bitmap.width/2)-40,(data[1].bitmap.height/2)-40);
            data[1].write('temp.png',function()
            {
                console.log("");
                console.log("composited succesfully");
                console.log("");
                embed.setColor('#ff0000');      //then attach the file to the embed and send it back
                embed.attachFile('./temp.png')
                embed.setImage('attachment://temp.png');
                msg.channel.send(embed);
                console.log("sent!");
                console.log("====================");
            });
        });
    }
});
client.login(ConfigFile.config.token);