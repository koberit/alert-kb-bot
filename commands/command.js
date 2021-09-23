const { Client, Intents } = require('discord.js');

const fs = require("fs");
const config = JSON.parse(fs.readFileSync("./utils/config.json", "utf8"));

module.exports = {
    name: "command",
    description: "This is a command!",
    execute(message, args){

		console.log("Nachricht mit command 'command' erhalten.");

    }
}