import React from 'react';

//  je ramene appolo
// npm install apollo-boost @apollo/react-hooks graphql
import ApolloClient from 'apollo-boost';

// permet a react de comprendre apollo bind
import {ApolloProvider} from '@apollo/react-hooks';

// iumportation de composant
import Booklist from'./components/Booklist';




// apollo client set up
const client_apollo = new ApolloClient({

  uri:'http://localhost:4000/graphql'
})

function App() {
  return (
    // nous pouvon ici injecter les valeur recupere par notre client
    // et les injecter dans dans notre app react
    <ApolloProvider client={client_apollo}>
      <div className="App">
        <h1> Huperr list </h1>
        
        <Booklist />
      </div>
    </ApolloProvider>
  );
}

export default App;
