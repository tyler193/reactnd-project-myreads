import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from './Book.js'


class Search extends React.Component {
//Thank you to Ryan Waite for the tips on how to search for and assign
//books to a shelf from the search page :)
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      results:[],
      query: ''
    }
  }


  //Gets books from BooksAPI
  componentDidMount() {
    BooksAPI.getAll().then(res => {
      this.setState({books : res})
    });
  }

  //Assign shelves to books
  updateShelves = (book, shelf) => {
    BooksAPI.update(book, shelf).then((response) => {
      book.shelf = shelf;
      this.setState((state) => ({
        books: state.books.filter((b) => b.id !== book.id).concat([book])
      }));
    });
  }

  //Text input
  newQuery = (query) => {
    this.setState({query: query}, this.searchQuery);
  }


  //Display results of query
  searchQuery() {
      if(this.state.query === "" || this.state.query === undefined) {
          return this.setState({ results: [] });
      }
      BooksAPI.search(this.state.query.trim()).then(response => {
          if(response.error) {
              return this.setState({ results: [] });
          } else {
            response.forEach((b) => {
              let find = this.state.books.filter((book) => book.id === b.id);
              if (find[0]) {
                b.shelf = find[0].shelf;
              }
            });
            return this.setState({ results: response });
          }
      });
  }



  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"
            value={this.state.query} onChange={(event) => this.newQuery(event.target.value)} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">

          {this.state.results.map((book, key) => <Book updateShelves={this.updateShelves} book={book} key={key} />)}

          </ol>
        </div>
      </div>
    );
  }
}


export default Search;
