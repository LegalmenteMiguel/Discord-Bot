const { EmbedBuilder } = require('discord.js');

const embedRecip = async(recipe) => {
    let ingredientes = ''
    recipe.ingredientes.forEach(ingrediente => {
        ingredientes += ingrediente + '\n';
    });

    return await new EmbedBuilder()
    .setTitle(recipe.nombre)
    .addFields(
	    { name: 'Ingredientes:', value: ingredientes }
    )
    .setColor('Random')
    .setImage(recipe.imagen);
}


module.exports = {
    embedRecip
};