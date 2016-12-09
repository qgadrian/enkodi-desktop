import React, { Component, PropTypes } from 'react';
import Movie from './Movie';

export default class Movies extends Component {
  static propTypes = {
    enkodi: PropTypes.shape({
      connection: PropTypes.shape({
        client: PropTypes.object.isRequired
      }).isRequired,
    }).isRequired
  };

  constructor(props) {
    super(props);

    const onScanFinished =
      this.props.enkodi.connection.client.VideoLibrary.OnScanFinished(this.refreshMovies);

    this.state = {
      loading: true,
      onScanFinished,
      movies: []
    };
  }

  componentDidMount() {
    this.refreshMovies();
  }

  componentWillUnmount() {
    this.state.onScanFinished.removeListener('VideoLibrary.OnScanFinished', this.refreshMovies);
  }

  refreshMovies = () => {
    const self = this;
    const filter = { properties: ['title', 'rating', 'year', 'runtime', 'thumbnail'] };

    this.props.enkodi.connection.client.VideoLibrary.GetMovies(filter)
      .then((data) => {
        const movies = data.movies.map((movie) => (
          <Movie
            key={movie.movieid}
            movieId={movie.movieid}
            title={movie.title}
            thumbnail={movie.thumbnail}
          />
        ));

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
