// Require graphsql
const graphql= require('graphql');

// une library
const _ = require('lodash');
const lodash_ = require('lodash');

// importation des model
const Book_Model = require('../models/book.js');
const Author_Model = require('../models/author.js');

/*----------------------------------------------------------------------------------------------------------------- */

// Ici on va  enfaite definir notre graph 
// Decrit les objets les data et comment interagir avec le data 

// Recuperation dun objet 
// On prend la fonction GraphQLObjectType dans le pakcage graphql
const {
    GraphQLObjectType,
    // string
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    // integer
    GraphQLInt,
    // list
    GraphQLList,

    //securisation de s data not null
    GraphQLNonNull,

} = graphql;


// data de test
/*
var books = [
    {name:'Name of wind' , genre:'Fantasy', id :'1',authorId:'1'},
    {name:'Lenpire atack', genre:'Action', id :'2',authorId:'3'},
    {name:'Mars et noir' , genre:'SCI-FI', id :'3',authorId:'2'},
    {name:'Name of wind' , genre:'Fantasy', id :'1',authorId:'1'},
    {name:'Lenpire ', genre:'Action', id :'6',authorId:'3'},
    {name:'noir' , genre:'SCI-FI', id :'8',authorId:'2'},
    {name:'ind' , genre:'Fantasy', id :'5',authorId:'1'},
    {name:' atack', genre:'Action', id :'7',authorId:'3'},
    {name:'neptune' , genre:'SCI-FI', id :'9',authorId:'2'},
];

// data de test
var authors = [
    {name:'matala kaka', age:44,id :'1'},
    {name:'diana ross', age:42,id :'2'},
    {name:'marco jean', age:66,id :'3'},
];

*/
// DEFINE OBJECT TYPE
/*----------------------------------------------------------------------------------------------------------------- */


// Definition dun nouveau type =>  GRAPHQL  
// Nous avont ici la structure dun type graphql
const BookType = new GraphQLObjectType({
    
    // IL est nommee Book
    name:'Book',

    // ET voici ses champs
    fields:()=>({

        // toue les champ ici sont de type string
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre : {type: GraphQLString},
        // un des feild de book et un objet de type AuthorType

        author :{
            type: AuthorType,
            // nous alons utilise le parent
            // qui est le book en soit juste au dessus

            resolve(parent,args){

                // controle sur le parent
                //console.log(parent);

                // controle sur la valeur de retour
                //console.log(_.find(authors,{id:parent.authorId}));

               // return _.find(authors,{id:parent.authorId});

                return Author_Model.findById(parent.authorId);

            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    
    // IL est nommee Book
    name:'Author',

    // ET voici ses champs
    fields:()=>({

        // toue les champ ici sont de type string
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age : {type: GraphQLInt},
        books : {
            type:new GraphQLList(BookType),
            resolve(parent,args){
                // on veut filtre toute les valeur dans la
                // books ou authorId ET Aguale a ID
                //return _.filter(books,{authorId:parent.id});

                return Book_Model.find({authorId:parent.id});
            }
        }
    })

});

// DEFINE ROOT QUERY
/*----------------------------------------------------------------------------------------------------------------- */

// Ici on va definir une route query ROUT QUERY
const RootQuery = new GraphQLObjectType({

    // Et une route d'accee
    name:'RoutQueryType',

    fields:{

        // POUR RECUPERE LES LIVRE
        book: 
            {
                // on ana definis le booktype plus haut
                type: BookType,

                // si quellqui fait une demande pour un livre en particulier
                // on espere recevoir un ID
                args:{id: {type:GraphQLID}},

                // RECUPERE LES DATA DE LA BASE DE DONNÉES
                resolve(parent,args){

                // ICI on va metre le code  de recuperation dans la base sudo npm install lofa  
                // use lodash (_) 

                // contorlle d'arriver des donnee
                //console.log(args);
                // console.log(lodash_.find(books,{id:args.id}));
                // je nais pas pourqui il ne renvoie rien
                //return _.find(books,{id:args.id});

                // ils va aller dans le models books
                // et recupere le book qui correspond id passer
                return Book_Model.findById(args.id);
                }
            },

        // POUR RECUPERER LE AUTHEUR
        author:
            {
                type: AuthorType,

                args:{id:{type:GraphQLID}},
                resolve(parent,args)
                {
                //console.log(lodash_.find(authors,{id:args.id}));
                //return _.find(authors,{id:args.id});
                
                return Author_Model.findById(args.id);
                }
            },

        // recupoere tout les books
        books: 
            {
                type: new GraphQLList(BookType), 
                resolve(parent,args)
                {
                // renvoie le tableau de livre complet
                //return books;

                // pour tous les books
                return Book_Model.find({});            
                }
            },

        // recupoere tout les authors
        authors:
            {
                type: new GraphQLList(AuthorType),
                resolve(parent,args)
                {
                 // renvoie le tableau de livre complet
                 //return authors;

                return Author_Model.find({});
                
                }
              
            }

    }
});

/*-----------------------------------------------------------------------------------------*/
// CREATION DE CRUD
// creation dun autheur par le user
const Mutation = new GraphQLObjectType({


    name:'Mutation',
    
    fields:{
        //la creation dun author
        // creation dun champ add author
        addAuthor:{
            type: AuthorType,
            args:{
                   // securisation de donnee rentre
                name:{type:GraphQLNonNull(GraphQLString)},
                age:{type: GraphQLNonNull(GraphQLInt)}
            },
            // nous recuperons les arguments  saisie par le user pour les stocker
            resolve(parent,args){
                // et nous cron l'author et on lui passe les arguments en paramettre
                let author = new Author_Model({
                    name:args.name,
                    age:args.age,

                });

                // on sauvegarde en base de donnee
               return author.save();
            }
        },

        // creation d'un book
        addBook:{
            type: BookType,
            args:{
                // securisation de donnee rentre
                name:{type: GraphQLNonNull(GraphQLString)},
                genre:{type: GraphQLNonNull(GraphQLString)},
                authorId:{type:GraphQLNonNull(GraphQLID)}

            },  
            // laison des argument au proprieter
            resolve(parent, args){
                let book = new Book_Model({
                    name:args.name,
                    genre:args.genre,
                    authorId:args.authorId
                });

                // enreegistrement du book en base de donnée
                //  et envoie au front end
                return book.save();

            }
        }


    }
})


// ici on definis ce que les user ont autoriser obtenir comme data si ils passe par ce chemin
// je definis le chema de mes routes ROUT QUERY
module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})