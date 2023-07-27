require('dotenv').config();

const mongoose = require('mongoose');
const { Client, GatewayIntentBits } = require('discord.js');

const { createRecipe } = require('./routes/createRecipe');
const { getRecipe } = require('./routes/getRecipe');
const { deleteRecipe } = require('./routes/deleteRecipe');

// const { embedRecip } = require('./handlers/handlerEmbed');

// Coneccion con Discord
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]});

(async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGODB_URI, { keepAlive: true });
    console.log('Connected to DB.');
})();

// Se obtiene el mensaje enviado en discord
client.on('interactionCreate', async interaction => {
    // Evita que el bot responda si no es un comando
    if(!interaction.isCommand()) return;
    
    // Evita que el bot responda en otros canales
    if(interaction.channelId !== process.env.DISCORD_CHANNEL_ID) return;

    if (interaction.commandName === 'receta') {
        const name = interaction.options.get('nombre').value;
        return interaction.reply({ embeds: [await getRecipe(name)] });
    }

    if (interaction.commandName === 'registrar') {
        const name = interaction.options.get('nombre').value;
        const desc = interaction.options.get('ingredientes').value;
        const url = interaction.options.get('imagen').value;
            
        return interaction.reply( await createRecipe(name, desc, url) );
    } 

    if (interaction.commandName === 'eliminar') {
        const name = interaction.options.get('nombre').value;
        return interaction.reply( await deleteRecipe(name) );
    }
});

// Logeamos al bot en Discord
client.login(process.env.DISCORD_TOKEN);
console.log('Recipe Bot is online');