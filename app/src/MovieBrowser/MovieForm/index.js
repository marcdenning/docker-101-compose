import React, { Component } from 'react';

class MovieForm extends Component {
  constructor(props) {
    super(props);

    if (props.movie) {
      this.state = Object.assign({}, props.movie);
    } else {
      this.state = {
        title: '',
        releaseYear: (new Date()).getFullYear(),
        rating: 0.0,
        imageUrl: ''
      };
    }

    this.updateMovieField = this.updateMovieField.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <p>Fill out the following fields to add a movie:</p>

        <label htmlFor="movie-title">Title</label>
        <input
          id="movie-title"
          name="title"
          type="text"
          value={this.state.title}
          onChange={this.updateMovieField}
        />

        <label htmlFor="movie-release-year">Release Year</label>
        <input
          id="movie-release-year"
          name="releaseYear"
          type="number"
          value={this.state.releaseYear}
          onChange={this.updateMovieField}
        />

        <label htmlFor="movie-rating">Rating</label>
        <input
          id="movie-rating"
          name="rating"
          type="number"
          value={this.state.rating}
          onChange={this.updateMovieField}
        />

        <label htmlFor="movie-image-url">Image URL</label>
        <input
          id="movie-image-url"
          name="imageUrl"
          type="text"
          value={this.state.imageUrl}
          onChange={this.updateMovieField}
        />

        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    );
  }

  updateMovieField(event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'number' ? Number(target.value) : target.value;

    this.setState({
      [name]: value
    });
  }

  submitForm(event) {
    const movie = Object.assign({}, this.state);

    event.preventDefault();
    if (!movie.id) {
      delete movie.id;
    }
    if (movie.imageUrl.trim() === '') {
      movie.imageUrl = null;
    }
    this.props.submitFormCallback(movie);
  }
}

export default MovieForm;
