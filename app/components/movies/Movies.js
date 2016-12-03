import React, { Component, PropTypes } from 'react';
import Movie from './Movie';

export default class Movies extends Component {
  static propTypes = {
    // onPlayerPause: PropTypes.func.isRequired,
    enkodi: PropTypes.shape({
      kodiHandler: PropTypes.object.isRequired
    }).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      movies: []
    };
  }

  componentDidMount() {
    const self = this;

    const filter = { properties: ['title', 'rating', 'year', 'runtime', 'thumbnail'] };
    this.props.enkodi.kodiHandler.connection.VideoLibrary.GetMovies(filter)
      .then((data) => {
        const movies = data.movies.map((movie) => (
          <Movie
            key={movie.movieid}
            title={movie.title}
            thumbnail={movie.thumbnail}
          />
        ));

        console.log(movies);
        self.setState({ movies });
        self.setState({ loading: false });
        return true;
      }).catch((error) => {
        console.error(error);
        self.setState({ loading: false });
      });
  }

  render() {
    let children;

    if (this.state.loading) {
      children = (<span className="loading">Loading movies...</span>);
    } else {
      children = this.state.movies;
    }

    return (
      <div className="movies">
        {children}
      </div>
    );
  }
}
