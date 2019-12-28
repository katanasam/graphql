import React, { Component } from 'react';
// pour ecrire des requette graphql
import {gql}from 'apollo-boost';
// permet a react de comprendre apollo bind
import {graphql} from '@apollo/react-hooks'; 

// on vient ici de creer la requette
// de reduperation de books
const getBooksQuery = gql `
{
    books{
        name
        id

    }
}
`

class Booklist extends Component {

// on veut juste rendre un component
render() {
    console.log(this.props);
  return (
    <div >
     <ul id="book-list"> 
        <li>Book name</li>
     
     </ul>
    </div>
  );
}

}
// on export le composant creer
// nous effectuons la laision a ce moment precis bind 
export default graphql(getBooksQuery)(Booklist);
