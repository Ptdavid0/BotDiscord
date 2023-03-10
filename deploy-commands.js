const { REST, Routes } = require("discord.js");

// import .env
const dotenv = require("dotenv");
dotenv.config();
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env;

// import commands
const fs = require("node:fs");
const path = require("node:path");
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

const commands = [];

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

// rest instance
const rest = new REST({ version: "10" }).setToken(TOKEN);

// deploy commands
(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
