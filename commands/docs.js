const {
  SlashCommandBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
} = require("discord.js");

const row = new ActionRowBuilder().addComponents(
  new StringSelectMenuBuilder()
    .setCustomId("select")
    .setPlaceholder("Nenhuma linguagem selecionada")
    .addOptions(
      {
        label: "javascript",
        description: "Veja a documentação de Javascript",
        value: "javascript",
      },
      {
        label: "python",
        description: "Veja a documentação de Python",
        value: "python",
      },
      {
        label: "C#",
        description: "Veja a documentação de C#",
        value: "csharp",
      },
      {
        label: "discord.js",
        description: "Veja a documentação de Discord.js",
        value: "discordjs",
      }
    )
);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("docs")
    .setDescription("Access the preferred documentation"),
  async execute(interaction) {
    await interaction.reply({
      content: "Select a language",
      components: [row],
    });
  },
};
