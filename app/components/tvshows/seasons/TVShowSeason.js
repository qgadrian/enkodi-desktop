import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import parseThumbnailUrl from '../../../utils/kodi/ImageUrlUtil';

export default class TVShowSeason extends Component {
  static propTypes = {
    thumbnail: PropTypes.string.isRequired,
    tvshowid: PropTypes.number.isRequired,
    season: PropTypes.number.isRequired,
  };

  render() {
    const seasonTitle = 'Season '.concat(this.props.season);

    return (
      <div className="season">
        <Link className="episodes" to={`/tvshows/${this.props.tvshowid}/${this.props.season}`}>
          <img className="thumbnail" alt="thumbnail" src={parseThumbnailUrl(this.props.thumbnail)} />
          <span className="title">{seasonTitle}</span>
        </Link>
      </div>
    );
  }
}
