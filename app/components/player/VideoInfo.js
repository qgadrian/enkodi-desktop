import React, { PropTypes } from 'react';
import parseThumbnailUrl from '../../utils/kodi/ImageUrlUtil';

export default class VideoInfo extends React.Component {
  static propTypes = {
    videoInfo: PropTypes.shape({
      type: PropTypes.string,
      tvshow: PropTypes.shape({
        showTitle: PropTypes.string.isRequired,
        plot: PropTypes.string.isRequired,
        seasonNumber: PropTypes.number.isRequired,
        episodeName: PropTypes.string.isRequired,
        episodeNumber: PropTypes.number.isRequired,
        tvshowPoster: PropTypes.string.isRequired,
      })
    }).isRequired
  };

  render() {
    if (this.props.videoInfo) {
      switch (this.props.videoInfo.type) {
        case 'episode': {
          const {
            plot, showTitle, seasonNumber, episodeName, episodeNumber, tvshowPoster
          } = this.props.videoInfo.tvshow;

          return (
            <div id="detail">
              <div className="poster">
                <img className="poster" alt="tvshow_poster" src={parseThumbnailUrl(tvshowPoster)} />
              </div>
              <div className="info">
                <div className="title">
                  <span className="title">{showTitle}</span>
                </div>
                <div className="episode">
                  <span className="name">{episodeName}</span>
                </div>
                <div className="season">
                  <span className="season">{`Season ${seasonNumber}, episode ${episodeNumber}`}</span>
                </div>
                <div className="plot">
                  <span className="plot">{plot}</span>
                </div>
              </div>
            </div>
          );
        }
        default:
          console.error(`Unrecognized video type ${this.props.videoInfo.type}`);
      }
    }

    return null;
  }
}
