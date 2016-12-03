import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class TVShowSeason extends Component {
  static propTypes = {
    thumbnail: PropTypes.string.isRequired,
    tvshowid: PropTypes.number.isRequired,
    season: PropTypes.number.isRequired,
  };

  parseThumbnailUrl = (rawUrl) => {
    const decodedUrl = decodeURIComponent(rawUrl.replace('image://', ''));
    return decodedUrl.slice(0, -1);
  }

  render() {
    const seasonTitle = 'Season '.concat(this.props.season);

    return (
      <div className="season">
        <Link className="episodes" to={`/tvshows/${this.props.tvshowid}/${this.props.season}`}>
          <img className="thumbnail" alt="thumbnail" src={this.parseThumbnailUrl(this.props.thumbnail)} />
          <span className="title">{seasonTitle}</span>
        </Link>
      </div>
    );
  }
}
