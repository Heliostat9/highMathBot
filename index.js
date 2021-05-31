
const { Telegraf, Markup} = require('telegraf');

const fetch = require('node-fetch');
const bot = new Telegraf('1818957304:AAHWhL7qW36imM8B2Ix-HGABwfvCzRUVdvY');
bot.start(async (ctx) =>{ 
    ctx.reply(`
    Привет, ${ctx.from.first_name} ${ctx.from.last_name}!
Что тебе нужно?
`, Markup.keyboard([
    ['Все'],
    ['Лекции', 'Практические'],
    ['Тесты', 'Контрольные']]).oneTime().resize());
});



bot.hears('Все', async (ctx) => {
    const lectures = await fetch('http://192.168.1.49:3000/').then(res => res.json());
    
    var btnLectures = {
        reply_markup: { "inline_keyboard" : [
            ...lectures.map(item => {
                return [{
                    text: item.title,
                    url: 'http://192.168.1.49:3000/doc/' + item.url
                }]
            })    
         
        ]}
    }
    return ctx.replyWithMarkdown('Все:',btnLectures);
});

bot.hears('Лекции', async (ctx) => {
    const lectures = await fetch('http://192.168.1.49:3000/lectures').then(res => res.json());
    
    var btnLectures = {
        reply_markup: { "inline_keyboard" : [
            ...lectures.map(item => {
                return [{
                    text: item.title,
                    url: 'http://192.168.1.49:3000/doc/' + item.url
                }]
            })    
         
        ]}
    }
    return ctx.replyWithMarkdown('Лекции:',btnLectures);
});
bot.hears('Тесты', async (ctx) => {
    const lectures = await fetch('http://192.168.1.49:3000/tests').then(res => res.json());
    
    var btnLectures = {
        reply_markup: { "inline_keyboard" : [
            [...lectures.map(item => {
                return {
                    text: item.title,
                    url: 'http://192.168.1.49:3000/doc/' + item.url
                }
            })    
         ]
        ]}
    }
    return ctx.replyWithMarkdown('Тесты:',btnLectures);
});
bot.hears('Практические', async (ctx) => {
    const lectures = await fetch('http://192.168.1.49:3000/practice').then(res => res.json());
    
    var btnLectures = {
        reply_markup: { "inline_keyboard" : [
            [...lectures.map(item => {
                return {
                    text: item.title,
                    url: 'http://192.168.1.49:3000/doc/' + item.url
                }
            })    
         ]
        ]}
    }
    return ctx.replyWithMarkdown('Практические:',btnLectures);
});
bot.hears('Контрольные', async (ctx) => {
    const lectures = await fetch('http://192.168.1.49:3000/controls').then(res => res.json());
    
    var btnLectures = {
        reply_markup: { "inline_keyboard" : [
            [...lectures.map(item => {
                return {
                    text: item.title,
                    url: 'http://192.168.1.49:3000/doc/' + item.url
                }
            })    
         ]
        ]}
    }
    return ctx.replyWithMarkdown('Контрольные:',btnLectures);
});


bot.launch();