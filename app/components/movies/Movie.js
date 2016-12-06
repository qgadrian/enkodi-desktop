import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Movie extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    movieId: PropTypes.number.isRequired,
  };

  parseThumbnailUrl = (rawUrl) => {
    const decodedUrl = decodeURIComponent(rawUrl.replace('image://', ''));
    return decodedUrl.slice(0, -1);
  }

  render() {
    return (
      <div className="movie">
        <Link className="movie" to={`/movies/${this.props.movieId}`}>
          <img className="thumbnail" alt="thumbnail" src={this.parseThumbnailUrl(this.props.thumbnail)} />
          <span className="title">{this.props.title}</span>
        </Link>
      </div>
    );
  }
}
