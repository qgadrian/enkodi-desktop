import React, { PropTypes } from 'react';

export default class PlayerControls extends React.Component {
  static propTypes = {
    onPlayPause: PropTypes.func.isRequired,
    onStop: PropTypes.func.isRequired,
    playing: PropTypes.bool.isRequired
  };

  handleOnPlayPause() {
    this.props.onPlayPause(!this.props.playing);
  }

  handleOnStop() {
    this.props.onStop();
  }

  handleOnSubtitles() {
    console.log('subtitles');
  }

  handleOnAudioChannel() {
    console.log('audio');
  }

  render() {
    const buttonStyle = this.props.playing ? 'player_pause' : 'player_play';

    return (
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
    );
  }

}
