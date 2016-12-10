import React, { Component, PropTypes } from 'react';
import parseThumbnailUrl from '../../../../utils/kodi/ImageUrlUtil';

export default class TVShowSeasonEpisode extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    plot: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    season: PropTypes.number.isRequired,
    episode: PropTypes.number.isRequired,
    file: PropTypes.string.isRequired,
    playcount: PropTypes.number.isRequired,
    onPlayEpisode: PropTypes.func.isRequired,
  };

  getPlayButtonIconClass() {
    return this.props.playcount > 0 ? 'player_replay' : 'player_play';
  }

  showCheckIfAlreadyWatched() {
    if (this.props.playcount > 0) {
      return (
        <i className="watched" />
      );
    }
  }

  handlePlayEpisode(file) {
    this.props.onPlayEpisode(file);
  }

  render() {
    const seasonTitle = 'Season '.concat(this.props.season);
    const episodeTitle = 'Episode '.concat(this.props.episode);

    return (
      <div className="episode">
        <div className="image_actions">
          <img className="thumbnail" alt="thumbnail" src={parseThumbnailUrl(this.props.thumbnail)} />
          {this.showCheckIfAlreadyWatched()}
          <button className="play" value="Play" onClick={this.handlePlayEpisode.bind(this, this.props.file)} >
            <i className={this.getPlayButtonIconClass()} />
          </button>
        </div>
        <div className="details">
          <span className="title">{this.props.title}</span>
          <span className="episode">{episodeTitle}</span>
          <span className="plot">{this.props.plot}</span>
        </div>
      </div>
    );
  }
}
