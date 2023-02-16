// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");

// import .env
const dotenv = require("dotenv");
dotenv.config();
const { TOKEN } = process.env;

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

// import commands
const fs = require("node:fs");
const path = require("node:path");
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const commandPath = path.join(commandsPath, file);
  const command = require(commandPath);
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  }
}

// Log in to Discord with your client's token
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});
client.login(TOKEN);

// Listener for slash commands
client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isStringSelectMenu()) {
    const selected = interaction.values[0];
    if (selected == "javascript") {
      await interaction.reply(
        "Documentação do Javascript: https://developer.mozilla.org/en-US/docs/Web/JavaScript"
      );
    } else if (selected == "python") {
      await interaction.reply("Documentação do Python: https://www.python.org");
    } else if (selected == "csharp") {
      await interaction.reply(
        "Documentação do C#: https://learn.microsoft.com/en-us/dotnet/csharp/"
      );
    } else if (selected == "discordjs") {
      await interaction.reply(
        "Documentação do Discord.js: https://discordjs.guide/#before-you-begin"
      );
    }
  }
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});
