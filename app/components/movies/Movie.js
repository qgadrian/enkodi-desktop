import React, { Component, PropTypes } from 'react';

export default class Movie extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
  };

  parseThumbnailUrl = (rawUrl) => {
    const decodedUrl = decodeURIComponent(rawUrl.replace('image://', ''));
    return decodedUrl.slice(0, -1);
  }

  render() {
    return (
      <div className="movie">
        <img className="thumbnail" alt="thumbnail" src={this.parseThumbnailUrl(this.props.thumbnail)} />
        <span className="title">{this.props.title}</span>
      </div>
    );
  }
}
