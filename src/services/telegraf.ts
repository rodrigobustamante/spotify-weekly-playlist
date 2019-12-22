import Telegraf from 'telegraf';

const bot = new Telegraf(process.env.TELEGRAM_API_KEY);

export default bot;
