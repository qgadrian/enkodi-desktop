// @flow
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import { connectionName, connectionHost, connectionPort, saveAndConnect, playerStatusChange, volumeChange } from '../actions/EnkodiActions';
import KodiHandler from '../utils/kodi/KodiHandler';

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
      const kodiHandler = new KodiHandler(host, port, (connection) => {
        connection.Player.OnPlay(() =>
          dispatch(playerStatusChange(true))
        );

        connection.Player.OnPause(() =>
          dispatch(playerStatusChange(false))
        );

        connection.Player.OnStop(() =>
          dispatch(playerStatusChange(false))
        );

        connection.Application.OnVolumeChanged((data) =>
          dispatch(volumeChange(data.data.volume))
        );
      });

      dispatch(saveAndConnect(name, host, port, kodiHandler));
    }
  };
}

function mapStateToProps(state) {
  return {
    enkodi: state.enkodi
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(Home);
