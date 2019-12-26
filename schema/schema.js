// Require graphsql
const graphql= require('graphql');

// Ici on va  enfaite definir notre graph 
// Decrit les objets les data et comment interagir avec le data 

// Recuperation dun objet 
// On prend la fonction GraphQLObjectType dans le pakcage graphql
const {GraphQLObjectType, GraphQLString} = graphql;

// Definition dun nouveau type
// Nous avont ici la structure dun type graphql
const BookkType = new GraphQLObjectType({
    
    // IL est nommee Book
    name:'Book',

    // ET voici ses champs
    fields:()=>({
        // toue les champ ici sont de type string
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre : {type: GraphQLString}
    })

});