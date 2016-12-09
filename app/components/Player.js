import React, { Component, PropTypes } from 'react';
import SeekBar from 'rc-slider';
import parseNumberAsTwoDigits from '../utils/Number';
import { handleSendEvent } from '../utils/kodi/KodiHandler';

const PlayerActions = require('../actions/kodi/PlayerActions');
const moment = require('moment');

class Player extends Component {
  static propTypes = {
    onPlayerSatusChange: PropTypes.func.isRequired,
    onRefreshPlayerTime: PropTypes.func.isRequired,
    onRefreshPlayerDetails: PropTypes.func.isRequired,
    enkodi: PropTypes.shape({
      connection: PropTypes.shape({
        client: PropTypes.object.isRequired,
      }).isRequired,
      player: PropTypes.shape({
        playing: PropTypes.bool.isRequired,
        type: PropTypes.string,
        tvshow: PropTypes.shape({
          showTitle: PropTypes.string.isRequired,
          seasonNumber: PropTypes.number.isRequired,
          episodeName: PropTypes.string.isRequired,
          episodeNumber: PropTypes.number.isRequired,
        }),
        hasPlayTimeInfo: PropTypes.bool.isRequired,
        currentTime: PropTypes.shape({
          percentage: PropTypes.number.isRequired,
          hours: PropTypes.number,
          minutes: PropTypes.number,
          seconds: PropTypes.number,
          millis: PropTypes.number,
        }).isRequired,
        totalTime: PropTypes.shape({
          hours: PropTypes.number,
          minutes: PropTypes.number,
          seconds: PropTypes.number,
          millis: PropTypes.number,
        })
      }).isRequired
    }).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    if (this.props.enkodi.player.hasPlayTimeInfo) {
      this.setState({
        totalPlaytime: moment({
          hours: this.props.enkodi.player.totalTime.hours,
          minutes: this.props.enkodi.player.totalTime.minutes,
          seconds: this.props.enkodi.player.totalTime.seconds,
          milliseconds: this.props.enkodi.player.totalTime.millis
        }).unix()
      });
    }

    if (!this.props.enkodi.player.playing) {
      if (this.state.seekBarTimer) {
        clearInterval(this.state.seekBarTimer);
      }

      if (this.state.percentageBarUpdateTimer) {
        clearInterval(this.state.percentageBarUpdateTimer);
      }
    }
  }

// TODO clear this wrongly used listeners
  componentDidMount() {
    if (this.props.enkodi.player.playing) {
      this.props.onRefreshPlayerTime(this.props.enkodi.connection.client);
      this.refreshCurrentPlayTime();
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.seekBarTimer);
    clearInterval(this.state.percentageBarUpdateTimer);
  }

  getCurrentPlayTimeString() {
    const timeString = '';
    const { hasPlayTimeInfo, currentTime: { hours, minutes, seconds }, totalTime } = this.props.enkodi.player;

    if (hasPlayTimeInfo) {
      if (totalTime.hours > 0) {
        timeString.concat(parseNumberAsTwoDigits(hours)).concat(':');
      }

      return timeString.concat(parseNumberAsTwoDigits(minutes)).concat(':').concat(parseNumberAsTwoDigits(seconds));
    }

    return '';
  }

  getVideoTypePlayDetail() {
    if (this.props.enkodi.player.playing) {
      switch (this.props.enkodi.player.type) {
        case 'episode': {
          const { seasonNumber, episodeNumber } = this.props.enkodi.player.tvshow;
          return (
            <div className="detail">
              <div className="title">
                <span className="title">{this.props.enkodi.player.tvshow.showTitle}</span>
              </div>
              <div className="episode">
                <span className="name">{this.props.enkodi.player.tvshow.episodeName}</span>
              </div>
              <div className="season">
                <span className="season">{`Season ${seasonNumber}, episode ${episodeNumber}`}</span>
              </div>
            </div>
          );
        }
        default: break;
      }
    }
  }

  refreshCurrentPlayTime() {
    if (this.props.enkodi.player.hasPlayTimeInfo) {
      const seekBarTimer = setInterval(() => {
        if (this.props.enkodi.player.playing) {
          const nextCurrentTime = moment({
            hours: this.props.enkodi.player.currentTime.hours,
            minutes: this.props.enkodi.player.currentTime.minutes,
            seconds: this.props.enkodi.player.currentTime.seconds,
            milliseconds: this.props.enkodi.player.currentTime.millis
          }).add(1, 'seconds');

          this.props.onRefreshPlayerDetails(nextCurrentTime);
        }
      }, 1000);

      const percentageBarUpdateTimer = setInterval(() => {
        if (this.props.enkodi.player.playing) {
          this.props.onRefreshPlayerTime(this.props.enkodi.connection.client);
        }
      }, 5000);

      this.setState({ seekBarTimer, percentageBarUpdateTimer });
    }
  }

  handleOnPlayPause() {
    if (this.props.enkodi.player.playing) {
      handleSendEvent(this.props.enkodi.connection.client, PlayerActions.playerPlayPauseAction());
      this.props.onPlayerSatusChange(!this.props.enkodi.player.playing);
    }
  }

  handleOnStop() {
    handleSendEvent(this.props.enkodi.connection.client, PlayerActions.playerStopAction());
  }

  handleOnSubtitles() {
    console.log('subtitles');
  }

  handleOnAudioChannel() {
    console.log('audio');
  }

  render() {
    const buttonStyle = this.props.enkodi.player.playing ? 'player_pause' : 'player_play';

    return (
      <div className="player">
        <div className="seek_bar">
          <div className="timer">
            <span>{this.getCurrentPlayTimeString()}</span>
          </div>
          <SeekBar
            min={0} max={100} disabled
            value={this.props.enkodi.player.currentTime.percentage}
            tipFormatter={null}
          />
        </div>

        <div className="actions">
          <button className="play_pause" onClick={this.handleOnPlayPause.bind(this)}>
            <i className={buttonStyle} />
          </button>
          <button className="stop" onClick={this.handleOnStop.bind(this)}>
            <i className="player_stop" />
          </button>
          <button className="subtitles" onClick={this.handleOnSubtitles.bind(this)}>
            <i className="player_subtitles" />
          </button>
          <button className="audio" onClick={this.handleOnAudioChannel.bind(this)}>
            <i className="player_audio" />
          </button>
        </div>

        {this.getVideoTypePlayDetail()}
      </div>
    );
  }
}

export default Player;
