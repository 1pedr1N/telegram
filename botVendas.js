const env = require("./.env");
const Telegraf = require("telegraf");
const Extra = require("telegraf/extra");
const Markup = require("telegraf/markup");

const bot = new Telegraf(env.token);

let list = [];

const buttons = () =>
  Extra.markup(
    Markup.inlineKeyboard(
      list.map((item) => Markup.callbackButton(item, `delete ${item}`)),
      { columns: 3 }
    )
  );

bot.start(async (content) => {
  const name = content.update.message.from.first_name;

  await content.reply(`Seja Bem Vindo (a), ${name} `);
  await content.reply(`Quais lugares você quer visitar comigo?`);
});

bot.on("text", (content) => {
  list.push(content.update.message.text);
  content.reply(`${content.update.message.text} Anotado!`, buttons());
});

bot.action(/delete (.+)/, (content) => {
  list = list.filter((item) => item !== content.match[1]);
  content.reply(
    `${content.match[1]}, que pena a gente podia se divertir neste lugar!`
  );
});

bot.startPolling();
