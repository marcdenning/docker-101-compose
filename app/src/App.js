import React, { Component } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import './App.css';

import { getBaseUrl } from './JsonApi/api.utils';
import MovieService from './MovieBrowser/MovieService';
import MovieBrowser from './MovieBrowser';
import DetailPage from'./MovieBrowser/DetailPage';
import AddPage from './MovieBrowser/AddPage';
import EditPage from './MovieBrowser/EditPage';

class App extends Component {
  constructor() {
    super();

    this.movieService = new MovieService(`${getBaseUrl(window.location, '/api')}/movies`);
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <header>
            <div>
              <h1><Link to="/">Movie Browser</Link></h1>
            </div>
          </header>

          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/add">Add Movie</Link></li>
            </ul>
          </nav>

          <main>
            <Routes>
              <Route path="/" element={<MovieBrowser movieService={this.movieService} />} />
              <Route path="movie/:id/edit" element={<EditPage movieService={this.movieService} />} />
              <Route path="movie/:id" element={<DetailPage movieService={this.movieService} />} />
              <Route path="add" element={<AddPage movieService={this.movieService} />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
