import React from 'react'
import { Link } from 'react-router-dom'
import Shelf from './Shelf.js'


class HomePage extends React.Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>

            <Shelf />
            <Shelf />
            <Shelf />

          </div>
        </div>
        <div className="open-search">
          <Link to='Search'>Add a book</Link>
        </div>
      </div>
    );
  }
}


export default HomePage;
