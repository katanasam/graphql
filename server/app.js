// on demande express
const express = require('express');

// on recuper graphql
const graphqlHTTP = require('express-graphql');

// on ramene notre schema 
const schema = require('./schema/schema');

// mogoose et un ORM 
const mongoose = require('mongoose');

//  permet a nos 2 serveur de communiquer entre eux
const cors = require('cors');


// on le store dans une constante
const app = express();

// permet communication entre server
app.use(cors());



mongoose.connect("mongodb+srv://root:root@cluster0-iqe4y.mongodb.net/test?retryWrites=true&w=majority");
mongoose.connection.once('open',()=> {
    console.log('connecte to database => CONNEXTION REUSSIE');
})



// ceation dun midelware 
// qui sera interpreter pas express comme etant destinée au graphql
app.use('/graphql',graphqlHTTP({
        schema,
       graphiql: true
    
}));

// on dmeande a  notre app decouter un port preci
// call back function 
app.listen(4000,()=> {
    console.log('Ecoute sur le port 4000 pour le server EXPRESS');
   
});

 
