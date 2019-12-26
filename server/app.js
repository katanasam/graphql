// on demande express
const express = require('express');

// on recuper graphql
const graphqlHTTP = require('express-graphql');

// on le store dans une constante
const app = express();


// ceation dun midelware 
// qui sera interpreter pas express comme etant destinée au graphql
app.use('/graphql',graphqlHTTP({

    
}));

// on dmeande a  notre app decouter un port preci
// call back function 
app.listen(4000,()=> {
    console.log('Ecoute sur le port 4000 pour le server EXPRESS');
});

 