// @flow
import { connect } from 'react-redux';
import Player from '../components/Player';
import { handleDispatchEvent } from '../utils/kodi/KodiHandler';

const PlayerActions = require('../actions/kodi/PlayerActions');

function matchDispatchToProps(dispatch) {
  return {
    onRefreshPlayerDetails: (nextCurrentTime) => {
      const currentTime = {
        hours: nextCurrentTime.hours(),
        minutes: nextCurrentTime.minutes(),
        seconds: nextCurrentTime.seconds(),
        millis: nextCurrentTime.milliseconds(),
      };
      dispatch(PlayerActions.playerRefreshPlayTime(currentTime));
    },
    onRefreshPlayerTime: (kodiClient) => {
      handleDispatchEvent(kodiClient, dispatch, PlayerActions.getPlayerProperties());
    },
    onPlayerSatusChange: (isPlaying) => {
      dispatch(PlayerActions.playerStatusChange(isPlaying));
    }
  };
}

function mapStateToProps(state) {
  return {
    enkodi: state.enkodi
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(Player);
