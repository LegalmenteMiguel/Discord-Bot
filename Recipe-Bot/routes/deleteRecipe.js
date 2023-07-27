const Recipe = require('../models/recipes');

const deleteRecipe = async (name) => {
    await Recipe.deleteMany({nombre: name});
    return `Receta ${name} eliminada`;
}

module.exports = { 
    deleteRecipe
};