import React, { Component, PropTypes } from 'react';
import SeekBar from 'rc-slider';
import PlayerControls from './../player/PlayerControls';
import VideoInfo from './../player/VideoInfo';
import parseNumberAsTwoDigits from '../../utils/Number';

const kodiHandler = require('../../utils/kodi/KodiHandler')();
const PlayerActions = require('../../actions/kodi/PlayerActions');
const moment = require('moment');

class Player extends Component {
  static propTypes = {
    onRefreshPlayerTime: PropTypes.func.isRequired,
    onRefreshPlayerDetails: PropTypes.func.isRequired,
    onPlayerSeek: PropTypes.func.isRequired,
    enkodi: PropTypes.shape({
      connection: PropTypes.shape({
        client: PropTypes.object.isRequired,
      }).isRequired,
      player: PropTypes.shape({
        playing: PropTypes.bool.isRequired,
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

    this.state = {
      seekLocked: false
    };
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
      this.clearTimers();
    }
  }

// TODO clear this wrongly used listeners
  componentDidMount() {
    this.props.onRefreshPlayerTime(this.props.enkodi.connection.client);
    this.refreshCurrentPlayTime();
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

  clearTimers() {
    if (this.state.seekBarTimer) {
      clearInterval(this.state.seekBarTimer);
    }

    if (this.state.percentageBarUpdateTimer) {
      clearInterval(this.state.percentageBarUpdateTimer);
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
    kodiHandler.handleSendEvent(this.props.enkodi.connection.client, PlayerActions.playerPlayPauseAction());
  }

  handleOnStop() {
    kodiHandler.handleSendEvent(this.props.enkodi.connection.client, PlayerActions.playerStopAction());
  }

  // SeekBar should be locked for a minor time to avoid a flood to the websocket and force close it
  handleOnSeek(seekPercentage) {
    if (!this.state.seekLocked) {
      this.setState({ seekLocked: true });
      this.props.onPlayerSeek(this.props.enkodi.connection.client, seekPercentage);
      setTimeout(() => this.setState({ seekLocked: false }), 100);
    }
  }

  render() {
    return (
      <div className="player center_content">
        <div className="seek_bar">
          <SeekBar
            min={0} max={100}
            value={this.props.enkodi.player.currentTime.percentage}
            tipFormatter={null}
            onChange={this.handleOnSeek.bind(this)}
          />
          <div className="timer">
            <span>{this.getCurrentPlayTimeString()}</span>
          </div>
        </div>

        <PlayerControls
          playing={this.props.enkodi.player.playing}
          onPlayPause={this.handleOnPlayPause.bind(this)}
          onStop={this.handleOnStop.bind(this)}
        />

        <VideoInfo videoInfo={this.props.enkodi.player.videoInfo} />
      </div>
    );
  }
}

export default Player;
