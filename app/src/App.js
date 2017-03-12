import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import './App.css';

import configureAxios from './MovieBrowser/MovieService/axios.configure';
import MovieService from './MovieBrowser/MovieService';
import MovieBrowser from './MovieBrowser';
import DetailPage from'./MovieBrowser/DetailPage';
import AddPage from './MovieBrowser/AddPage';
import EditPage from './MovieBrowser/EditPage';

class App extends Component {
  constructor() {
    super();

    this.movieService = new MovieService(configureAxios(window.location, '/api/'), 'movies');
  }

  render() {
    return (
      <Router>
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
            <Switch>
              <Route exact path="/" render={() => (<MovieBrowser movieService={this.movieService} />)} />
              <Route path="/movie/:id/edit" render={(props) => (<EditPage movieService={this.movieService} {...props} />)} />
              <Route path="/movie/:id" render={(props) => (<DetailPage movieService={this.movieService} {...props} />)} />
              <Route path="/add" render={({ history }) => (<AddPage movieService={this.movieService} history={history} />)} />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
