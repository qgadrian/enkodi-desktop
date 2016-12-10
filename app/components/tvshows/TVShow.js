import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import parseThumbnailUrl from '../../utils/kodi/ImageUrlUtil';

export default class TVShow extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    tvshowid: PropTypes.number.isRequired,
  };

  render() {
    return (
      <div className="tvshow">
        <input type="hidden" value={this.props.tvshowid} />
        <Link className="seasons" to={`/tvshows/${this.props.tvshowid}`}>
          <img className="thumbnail" alt="thumbnail" src={parseThumbnailUrl(this.props.thumbnail)} />
          <span className="title">{this.props.title}</span>
        </Link>
      </div>
    );
  }
}
