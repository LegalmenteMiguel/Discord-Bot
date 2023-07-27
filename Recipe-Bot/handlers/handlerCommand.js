require('dotenv').config();

const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

// Se crean los comandos de la aplicación
const commands = [
    {
        name: 'registrar',
        description: 'Agregar una receta <MEJORAR>',
        options: [
            {
                name: 'nombre',
                description: 'Nombre de la receta',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'ingredientes',
                description: 'Ingredientes de la receta',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'imagen',
                description: 'Imagen de la receta',
                type: ApplicationCommandOptionType.String,
                required: false
            }
        ]
    },
    {
        name: 'receta',
        description: 'Buscar una receta <MEJORAR>',
        options: [
            {
                name: 'nombre',
                description: 'Nombre de la receta',
                type: ApplicationCommandOptionType.String,
                required: true
            }
        ]
    },
    {
        name: 'eliminar',
        description: 'Elimina una receta <MEJORAR>',
        options: [
            {
                name: 'nombre',
                description: 'Nombre de la receta',
                type: ApplicationCommandOptionType.String,
                required: true
            }
        ]
    }
];

// Se obtiene el token del bot
const rest = new REST().setToken(process.env.DISCORD_TOKEN);

// Se cargan los comandos en el servidor
(async () => {
	try {
        // Agrega los comandos al servidor
		await rest.put(
			Routes.applicationGuildCommands( process.env.DISCORD_BOT_ID, process.env.DISCORD_GUILD_ID ),
			{ body: commands },
		);

        // Obtiene los comandos registrados
        // const cmds = await rest.get(
        //     Routes.applicationGuildCommands( process.env.DISCORD_BOT_ID, process.env.DISCORD_GUILD_ID )
        // );

        // Elimina los comandos registrados
        // cmds.forEach( async cmd => {
        //     await rest.delete(
        //         Routes.applicationGuildCommand( process.env.DISCORD_BOT_ID, process.env.DISCORD_GUILD_ID, cmd.id )
        //     )
        // });

	} catch (error) {
		console.error(error);
	}
})();