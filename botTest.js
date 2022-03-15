const env = require("./.env");
const Telegraf = require("telegraf");

// starting bot
const bot = new Telegraf(env.token);
bot.start((content) => {
  const from = content.update.message.from;

  console.log(from);

  content.reply(
    `Bem Vindo ao Bot do Pedro, aproveite ${from.first_name}, caso queira conhecer mais o Pedro basta digitar algo`
  );
});
bot.on("text", (content, next) => {
  content.reply(
    "Então você chegou até aqui, que legal que queira me conhecer <3 "
  );
  next();
});
bot.startPolling();
