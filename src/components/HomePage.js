import React from 'react'
import { Link } from 'react-router-dom'
import Shelf from './Shelf.js'
import * as BooksAPI from '../BooksAPI'


class HomePage extends React.Component {

  //Controls books' state
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }


  //Gets books from BooksAPI
  componentDidMount() {
    BooksAPI.getAll().then(res => {
      this.setState({books : res})
    });
  }

//Updates what shelf the books are on based on selection.
//Thank you to Ryan Waite for the tips on how to do this. :)
  updateShelves = (book, shelf) => {
    BooksAPI.update(book, shelf).then((response) => {
      book.shelf = shelf;
      this.setState((state) => ({
        books: state.books.filter((b) => b.id !== book.id).concat([book])
      }));
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

            <Shelf updateShelves={this.updateShelves} name='Currently Reading' books={this.state.books.filter(name => name.shelf === 'currentlyReading')}/>
            <Shelf updateShelves={this.updateShelves} name='Want to Read' books={this.state.books.filter(name => name.shelf === 'wantToRead')}/>
            <Shelf updateShelves={this.updateShelves} name='Read' books={this.state.books.filter(name => name.shelf === 'read')}/>

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
