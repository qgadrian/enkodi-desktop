import React, { Component, PropTypes } from 'react';

const kodiApiActions = require('../actions/KodiApiActions');

class Player extends Component {
  static propTypes = {
    onPlayerSatusChange: PropTypes.func.isRequired,
    enkodi: PropTypes.shape({
      kodiHandler: PropTypes.object.isRequired,
      player: PropTypes.shape({
        playing: PropTypes.bool.isRequired
      }).isRequired
    }).isRequired
  };

  componentDidMount() {
    this.props.enkodi.kodiHandler.connection.Player.OnPause((data) => {
      this.props.onPlayerSatusChange(false);
    });
  }

  handleOnPlayPause() {
    this.props.enkodi.kodiHandler.handleSendEvent(kodiApiActions.playerPlayPauseAction());
    this.props.onPlayerSatusChange(!this.props.enkodi.player.playing);
  }

  handleOnStop() {
    // this.props.kodiHandler.handleSendEvent(kodiApiActions.playerStopAction());
    this.props.enkodi.kodiHandler.handleSendEvent(kodiApiActions.playerStopAction());
    // tODO send stop action
    this.props.onPlayerSatusChange(false);
  }

  render() {
    const playPauseText = this.props.enkodi.player.playing ? 'Pause' : 'Play';

    return (
      <div className="player">
        <div className="actions">
          <button className="play_pause" onClick={this.handleOnPlayPause.bind(this)}>{playPauseText}</button>
          <button className="stop" onClick={this.handleOnStop.bind(this)}>Stop</button>
        </div>
      </div>
    );
  }
}

export default Player;
