import React, { Component, PropTypes } from 'react';

export default class TVShowSeasonEpisode extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    plot: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    season: PropTypes.number.isRequired,
    episode: PropTypes.number.isRequired,
    file: PropTypes.string.isRequired,
    onPlayEpisode: PropTypes.func.isRequired,
  };

  parseThumbnailUrl = (rawUrl) => {
    const decodedUrl = decodeURIComponent(rawUrl.replace('image://', ''));
    return decodedUrl.slice(0, -1);
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
          <img className="thumbnail" alt="thumbnail" src={this.parseThumbnailUrl(this.props.thumbnail)} />
          <input
            type="button" className="play" value="Play"
            onClick={this.handlePlayEpisode.bind(this, this.props.file)}
          />
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
