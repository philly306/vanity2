const discord = require("discord.js")
const client = new discord.Client()
const config = require("./config.json")
var json = require('./package.json');
const axios = require('axios')

//READY
client.on("ready", async() => {
    let startdate = new Date();
    let starttime = startdate.getHours() + ":" + startdate.getMinutes() + ":" + startdate.getSeconds();
    let enabled;
    if (config.console.logs === true) enabled = `Yes`;
    else if (config.console.logs === false) enabled = `No`;
    else enabled = `Can't Detect`;
    console.log('[SC-DEV] Vanity Prio Bot Has Started!')
        //hyper-Logger!
    const nodelogger = require('hyperz-nodelogger')


    const logger = new nodelogger()
    logger.hypelogger(`      SC-DEV`, '550', 'blue', ` [SC-Dev] [Info] Verifying...  Verifyed\n\n [SC-Dev] [Info] Bot Name: ${client.user.tag}\n\n [SC-Dev] [Info] Bot Status: ${client.user.presence.status}\n\n [SC-Dev] [Info] Allowed Users: ${client.user.id}\n\n [SC-Dev] [Info] Number of Servers: ${client.guilds.cache.size}\n\n [SC-Dev] [Info] Website:https://clapz.dev!\n\n [SC-Dev] [Info] Bot Verison:1.0.0\n\n\ [SC-Dev] [Info] Bot Logging:Console Logging \n\n\n                    ▼BELOW▼`, 'disabled', 'blue', 'single', false)

    async function checkVersion() {
        let version = "1.0.0";
        try {
            let rescheck = await axios({
                url: 'https://raw.githubusercontent.com/Lmaoclapz/Clapz.DevBot/main/README.md?token=AUU3PO7C3SRKNN6CGSUFOBTBBMG5Q'
            });
            const hasNewVersion = rescheck.data.version !== version;
            if (hasNewVersion) console.log(`\x1b[93mAn update is available!\x1b[0m\nChanges: ${rescheck.data.changelog}`);
        } catch (err) {}
    }
    checkVersion()

    //regular colsol log if u dont want hyper log
    //console.log(`[SC-Dev-Info]: Verified!}`);
    //console.log(`[SC-Dev-Info]: Logged in as: ${client.user.tag}`);
    //console.log(`[SC-Dev-Info]: Current status: ${client.user.presence.status}`);
    //console.log(`[SC-Dev-Info]: Website:https://clapz.dev`);
    //console.log(`[SC-Dev-Info]: User ID: ${client.user.id}`);
    //console.log(`[SC-Dev-Info]: Servers: ${client.guilds.cache.size}`);
    //console.log(`[SC-Dev-Info]: Channels: ${client.channels.cache.size}`);
    //console.log(`[SC-Dev-Info]: Allowed Users: ${client.user.id}`);
    //console.log(`[SC-Dev-Info]: Bot Verison:1.0.0`);
    //console.log(`[SC-Dev-Info]: Bot Logging: Console Logging\n\n                  ▼BELOW▼`);
})

//Bot Status
client.once('ready', () => {
    client.user.setActivity({ type: "WATCHING", name: `Your Status!  .gg/scdev` })
        //TYPES ARE: PLAYING, STREAMING, WATCHING, LISTENING
});


//help command
client.on('message', message => {
    if (message.content === ".help") {
        const embed = new discord.MessageEmbed()
            .setAuthor(`${message.author.username} in ${message.channel.name}`, `${message.author.displayAvatarURL({dynamic: true })}`, 'https://discord.gg/scdev')
            .setColor(config.embed.help)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .addFields({ name: 'Support:', value: 'If you would like to add this bot to your server join https://discord.gg/scdev' }, )
            .setTimestamp()
            .setFooter('©SC-Development • .gg/scdev', 'https://cdn.discordapp.com/icons/810919483903705148/a_b356449c20c1094fda0405299583d53a.gif');
        message.channel.send(embed);
    }
})

//hi command
client.on('message', message => {
    if (message.content === "hi") {
        const embed = new discord.MessageEmbed()
            .setAuthor(`${message.author.username} in ${message.channel.name}`, `${message.author.displayAvatarURL({dynamic: true })}`, 'https://discord.gg/scdev')
            .setColor(config.embed.hi)
            .setDescription('HI! 👋,Hows your day!')
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setTimestamp()
            .setFooter('©SC-Development • .gg/scdev', 'https://cdn.discordapp.com/icons/810919483903705148/a_b356449c20c1094fda0405299583d53a.gif');
        message.channel.send(embed);
    }
})


client.on('presenceUpdate', async(oldm, newm) => {
        try {
            let date = new Date()
            let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
            let olds = oldm.activities[0].state;
            if (oldm.member.user.bot || newm.member.user.bot) return;
            let news = newm.activities[0].state;
            if (olds === news) return;

            //Added the vanity to statsus
            if (news.includes(config.vanityprio.discordvanity) && !newm.member.roles.cache.has(config.vanityprio.roleid)) {
                newm.member.roles.add(config.vanityprio.roleid).then(async d => {
                    const clapz = new discord.MessageEmbed()
                        .setColor(config.embed.add)
                        .setTitle(config.title.add)
                        .setDescription(`__**<@${newm.user.id}>**__ Has Added Vantity (${config.vanityprio.discordvanity}) to their account, thier role has been added!`)
                        .setTimestamp()
                        .setThumbnail(newm.guild.iconURL({ dynamic: true }))
                        .setFooter('©SC-Development • .gg/scdev', 'https://cdn.discordapp.com/icons/810919483903705148/a_b356449c20c1094fda0405299583d53a.gif');
                    if (config.console.logs === true) client.channels.cache.get(config.vanityprio.channelid).send(clapz);
                    //CONSOLE LOG MESSAGE
                    console.log(`@CONSOLE-LOGER!-User:${newm.user.tag} Has Added Vantity:${config.vanityprio.vanity} Into Their Status! Time:{${time}}`)
                }).catch(() => {})

                //took out vanity from status
            } else if (!news.includes(config.vanityprio.discordvanity) && newm.member.roles.cache.has(config.vanityprio.roleid)) {
                newm.member.roles.remove(config.vanityprio.roleid).catch(() => {})
                const clapzremoved = new discord.MessageEmbed()
                    .setColor(config.embed.took)
                    .setTitle(config.title.took)
                    .setDescription(`__**<@${newm.user.id}>**__ Has removed the vanity ${config.vanityprio.discordvanity} from Their acount, their role has been removed!`)
                    .setTimestamp()
                    .setThumbnail(newm.guild.iconURL({ dynamic: true }))
                    .setFooter('©SC-Development • .gg/scdev', 'https://cdn.discordapp.com/icons/810919483903705148/a_b356449c20c1094fda0405299583d53a.gif');
                if (config.console.logs === true) client.channels.cache.get(config.vanityprio.channelid).send(clapzremoved);
                //CONSOLE LOG MESSAGE
                console.log(`@CONSOLE-LOGER!-User:${newm.user.tag} Has Taken Out Vantity:${config.vanityprio.discordvanity} Of Their Status! Time:{${time}}`)
            }
        } catch (e) {}
    })
    //BY Kronos&Clapzs
client.login(config.bot.login)