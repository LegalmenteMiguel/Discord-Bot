const Recipe = require('../models/recipes');

const createRecipe = async (name, desc, url) => {
    const recipe = new Recipe({nombre: name, ingredientes: desc.split(','), imagen: url, calificacion: 0});
    await recipe.save();
    return `${name} ha sido registrado con exito!`;
}

module.exports = { 
    createRecipe 
};