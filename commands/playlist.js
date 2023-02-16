const { SlashCommandBuilder } = require("discord.js");

const link =
  "https://open.spotify.com/playlist/7irCnt2RDuMby5gaREsr6a?si=8dd9325feb3548b2";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("playlist")
    .setDescription("listen to a playlist"),
  async execute(interaction) {
    await interaction.reply(link);
  },
};
