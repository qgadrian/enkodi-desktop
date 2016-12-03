import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class TVShow extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    tvshowid: PropTypes.number.isRequired,
  };

  parseThumbnailUrl = (rawUrl) => {
    const decodedUrl = decodeURIComponent(rawUrl.replace('image://', ''));
    return decodedUrl.slice(0, -1);
  }

  render() {
    return (
      <div className="tvshow">
        <input type="hidden" value={this.props.tvshowid} />
        <Link className="seasons" to={`/tvshows/${this.props.tvshowid}`}>
          <img className="thumbnail" alt="thumbnail" src={this.parseThumbnailUrl(this.props.thumbnail)} />
          <span className="title">{this.props.title}</span>
        </Link>
      </div>
    );
  }
}
