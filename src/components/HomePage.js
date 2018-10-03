import React from 'react'
import { Link } from 'react-router-dom'
import Shelf from './Shelf.js'
import * as BooksAPI from '../BooksAPI'


class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }


  componentDidMount() {
    BooksAPI.getAll().then(res => {
      this.setState({books : res})
    });
  }


  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>

            <Shelf name='Currently Reading' books={this.state.books.filter(name => name.shelf === 'currentlyReading')}/>
            <Shelf name='Want to Read' books={this.state.books.filter(name => name.shelf === 'wantToRead')}/>
            <Shelf name='Read' books={this.state.books.filter(name => name.shelf === 'read')}/>

          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    );
  }
}


export default HomePage;
