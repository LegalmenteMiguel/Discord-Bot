const mongoose = require('mongoose');

const schema = mongoose.Schema;

const recipeSchema = new schema({
    nombre: String,
    ingredientes: [],
    imagen: String
});

const recipe = mongoose.model('Recetas', recipeSchema);

module.exports = recipe;