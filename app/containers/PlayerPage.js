// @flow
import { connect } from 'react-redux';
import Player from '../components/player/Player';

const kodiHandler = require('../utils/kodi/KodiHandler')();
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
      kodiHandler.handleDispatchEvent(kodiClient, dispatch, PlayerActions.getPlayerProperties());
    },
    onPlayerSeek: (kodiClient, seekPercentage) => {
      kodiHandler.handleDispatchEvent(kodiClient, dispatch, PlayerActions.playerSeek(seekPercentage));
    }
  };
}

function mapStateToProps(state) {
  return {
    enkodi: state.enkodi
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(Player);
