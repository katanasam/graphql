const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creattion de la table book
const bookSchema = new Schema({

    // nous venon de creer la structure d'un champ
    name: String,
    genre: String,
    authorId:String
})

// creation dun model pour la base de donnee
// et on lui passe un schema (structure) du model
module.exports = mongoose.model('Book',bookSchema);