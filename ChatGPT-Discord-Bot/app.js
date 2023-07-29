require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');

// Coneccion con Discord
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]});

// Coneccion con OpenAI
const configuration = new Configuration({ 
    organization: process.env.OPENAI_ORGANIZATION,
    apiKey: process.env.OPENAI_KEY
});

const openai = new OpenAIApi(configuration);

// Se obtiene el mensaje enviado en discord
client.on('messageCreate', async message => {
    // Evita que el bot se responda a si mismo u otros bots
    if(message.author.bot) return;
    // Evita que el bot responda en otros canales
    if(message.channelId !== process.env.DISCORD_CHANNEL_ID) return;

    try{
        // Se muestra que el bot esta escribiendo
        await message.channel.sendTyping();

        // Para tener un log de conversacion con el bot
        /* 
            // Se obtienen los ultimos 10 mensajes del canal
            let prevMessage = await message.channel.messages.fetch({ limit: 10 });
            prevMessage.reverse();
            // prevMessage.sort((a, b) => a - b);

            // Se crea un log de conversacion
            let conversationLog = '';
            prevMessage.forEach(msg => {
                conversationLog += `\n${msg.author.username}: ${msg.content}`;
            });
        */ 

        // Se envia el mensaje a OpenAI
        const gptResponse = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `${client.user.username} es un bot amistoso.\n
            ${client.user.username}: Hola, ¿cómo puedo ayudarte?\n
            ${message.author.username}: ${message.content}\n
            ${client.user.username}:`,
            // prompt: `${client.user.username} es un bot amistoso.\n
            // ${client.user.username}: Hola, ¿cómo puedo ayudarte?\n
            // ${conversationLog}\n
            // ${client.user.username}:`,
            temperature: 0.2,
            max_tokens: 50
        });

        // Se envia la respuesta de OpenAI
        message.reply(`${gptResponse.data.choices[0].text}`);
    }catch(error){
        console.log(error);
    }
});

// Logeamos al bot en Discord
client.login(process.env.DISCORD_TOKEN);
console.log('ChatGPT Bot is online!');