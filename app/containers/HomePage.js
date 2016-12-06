// @flow
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import { connectionName, connectionHost, connectionPort, saveAndConnect, playerStatusChange,
  playerStop, volumeChange, playingTvshowEpisode, playerPlayDetails } from '../actions/EnkodiActions';
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
        connection.Player.OnPlay((data) => {
          const playerFilter = { playerid: 1, properties: ['percentage', 'time', 'totaltime', 'audiostreams', 'subtitles'] };
          connection.Player.GetProperties(playerFilter).then((playDetails) =>
            dispatch(playerPlayDetails(playDetails.percentage, playDetails.time, playDetails.totaltime))
          ).catch((error) => console.error(error));

          switch (data.data.item.type) {
            case 'episode': {
              const episodeid = data.data.item.id;
              const filter = { episodeid, properties: ['showtitle', 'title', 'season', 'episode'] };
              connection.VideoLibrary.GetEpisodeDetails(filter).then((episodeData) => {
                const details = episodeData.episodedetails;
                return dispatch(playingTvshowEpisode(details.showtitle, details.season, details.title, details.episode));
              }).catch((error) => console.error(error));
              break;
            }
            default:
              break;
          }

          dispatch(playerStatusChange(true));
        });

        connection.Player.GetItem({ playerid: 1 }).then((data) => {
          refreshPlayerProperties(dispatch, connection, data.item.type, data.item.id);
        }).catch((error) => console.error(error));

        connection.Player.OnPause(() =>
          dispatch(playerStatusChange(false))
        );

        connection.Player.OnStop(() =>
          dispatch(playerStop())
        );

        connection.Application.OnVolumeChanged((data) =>
          dispatch(volumeChange(data.data.volume))
        );
      });

      dispatch(saveAndConnect(name, host, port, kodiHandler));
    }
  };
}

function refreshPlayerProperties(dispatch, connection, type, itemId) {
  const playerFilter = { playerid: 1, properties: ['percentage', 'time', 'totaltime', 'audiostreams', 'subtitles', 'speed'] };
  connection.Player.GetProperties(playerFilter).then((playDetails) => {
    if (playDetails.speed > 0) {
      console.log(playDetails);
      dispatch(playerPlayDetails(playDetails.percentage, playDetails.time, playDetails.totaltime));
    }
    return true;
  }).catch((error) => console.error(error));

  switch (type) {
    case 'episode': {
      const filter = { episodeid: itemId, properties: ['showtitle', 'title', 'season', 'episode'] };
      connection.VideoLibrary.GetEpisodeDetails(filter).then((episodeData) => {
        const details = episodeData.episodedetails;
        return dispatch(playingTvshowEpisode(details.showtitle, details.season, details.title, details.episode));
      }).catch((error) => console.error(error));
      break;
    }
    default:
      break;
  }
}

function mapStateToProps(state) {
  return {
    enkodi: state.enkodi
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(Home);
