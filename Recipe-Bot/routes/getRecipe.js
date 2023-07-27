const Recipe = require('../models/recipes');
const { embedRecip } = require('../handlers/handlerEmbed');

const getRecipe = async (name) => {
    const recipe = await Recipe.find({nombre: name});
    const embed = await embedRecip(recipe[0]);
    return embed;
}

module.exports = { 
    getRecipe
};