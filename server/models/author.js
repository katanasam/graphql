const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creattion de la table book
const authorSchema = new Schema({

    // nous venon de creer la structure d'un champ
    name: String,
    age:Number

})

// creation dun model (entité)pour la base de donnee
// et on lui passe un schema (structure) du model
module.exports = mongoose.model('Author',authorSchema);