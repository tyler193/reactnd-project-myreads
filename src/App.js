import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

import { Route } from "react-router-dom"
import HomePage from './components/HomePage.js'
import Search from './components/Search.js'

class BooksApp extends React.Component {

  render() {
    return(
      <div>

      <Route exact path='/' component={ HomePage } />
      <Route exact path='/search' component={ Search } />

      </div>
    );
  }
}

export default BooksApp
