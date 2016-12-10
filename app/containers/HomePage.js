// @flow
import { connect } from 'react-redux';
import Home from '../components/Home';
import { volumeChange } from '../actions/kodi/VolumeActions';
import { kodiConnect, connectionName, connectionHost, connectionPort } from '../actions/kodi/ConnectionActions';
import { createConnection, handleDispatchEvent } from '../utils/kodi/KodiHandler';

const PlayerActions = require('../actions/kodi/PlayerActions');

function matchDispatchToProps(dispatch) {
  return {
    onNameChange: (name) => {
      dispatch(connectionName(name));
    },

    onHostChange: (host) => {
      dispatch(connectionHost(host));
    },

    onPortChange: (port) => {
      dispatch(connectionPort(port));
    },

    onSaveAndConnect: (name, host, port) => {
      createConnection(host, port, (kodiClient) => {
        dispatch(kodiConnect(name, host, port, kodiClient));

        kodiClient.Player.OnPlay((data) =>
          refreshPlayingInformation(kodiClient, dispatch, data.data.item.type, data.data.item.id));

        kodiClient.Player.GetItem({ playerid: 1 })
          .then((data) => refreshPlayingInformation(kodiClient, dispatch, data.item.type, data.item.id))
          .catch((error) => console.error(error));

        kodiClient.Player.OnPause(() =>
          dispatch(PlayerActions.playerStatusChange(false))
        );

        kodiClient.Player.OnStop(() =>
          dispatch(PlayerActions.playerStop())
        );

        kodiClient.Application.OnVolumeChanged((data) =>
          dispatch(volumeChange(data.data.volume))
        );

        kodiClient.Player.OnSeek(() =>
          refreshPlayerProperties(kodiClient, dispatch)
        );
      });
    }
  };
}

function mapStateToProps(state) {
  return {
    enkodi: state.enkodi
  };
}

function refreshPlayingInformation(kodiClient, dispatch, type, itemId) {
  const somethingPlaying = itemId !== undefined;
  if (somethingPlaying) {
    refreshPlayerProperties(kodiClient, dispatch);
    refreshPlayingInformationByVideoType(kodiClient, dispatch, type, itemId);
    dispatch(PlayerActions.playerStatusChange(true));
  }
}

function refreshPlayerProperties(kodiClient, dispatch) {
  handleDispatchEvent(kodiClient, dispatch, PlayerActions.getPlayerProperties());
}

function refreshPlayingInformationByVideoType(kodiClient, dispatch, type, itemId) {
  switch (type) {
    case 'episode': {
      handleDispatchEvent(kodiClient, dispatch, PlayerActions.getEpisodeDetails(itemId));
      break;
    }
    default:
      console.warn(`Unrecognized video type: ${type}`);
      break;
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(Home);
