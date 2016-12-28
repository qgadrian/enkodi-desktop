const InputActions = require('../../actions/kodi/InputActions');
const LibraryActions = require('../../actions/kodi/LibraryActions');
const VolumeActions = require('../../actions/kodi/VolumeActions');
const PlayerActions = require('../../actions/kodi/PlayerActions');
const kodiWs = require('kodi-ws');

const KodiHandler = function () {
  if (!(this instanceof KodiHandler)) return new KodiHandler();
};

KodiHandler.prototype.createConnection = (host, port, callback) => {
  console.log(`Connecting to Kodi in ${host}:${port}...`);
  kodiWs(host, port)
    .then((connection) => callback(connection))
    .catch((error) => { console.error(error); });
};

KodiHandler.prototype.handleDispatchEvent = (kodiClient, dispatch, action) => {
  switch (action.type) {
    case PlayerActions.GET_PLAYER_PROPERTIES: {
      kodiClient.Player.GetProperties(action.filter).then((playDetails) =>
        dispatch(PlayerActions.playerPlayDetails(
          playDetails.percentage, playDetails.time, playDetails.totaltime, playDetails.speed !== 0))
      ).catch((error) => console.error(error));
      break;
    }
    case PlayerActions.GET_EPISODE_DETAILS: {
      kodiClient.VideoLibrary.GetEpisodeDetails(action.filter).then((episodeData) => {
        const { showtitle, season, title, episode, plot,
          art: { 'tvshow.poster': tvshowPoster }
        } = episodeData.episodedetails;

        return dispatch(PlayerActions.playingTvshowEpisode(showtitle, plot, season, title, episode, tvshowPoster));
      }).catch((error) => console.error(`Using [${action.filter}] error was thrown: ${error}`));
      break;
    }
    case PlayerActions.PLAYER_SEEK: {
      kodiClient.Player.Seek(action.params).then((playDetails) =>
        dispatch(PlayerActions.playerPlayDetails(
          playDetails.percentage, playDetails.time, playDetails.totaltime, playDetails.speed !== 0))
      ).catch((error) => console.error(error));
      break;
    }
    default: break;
  }
};

KodiHandler.prototype.handleSendEvent = (connection, action) => {
  switch (action.type) {
    // Input
    case InputActions.INPUT_UP:
      return connection.Input.Up().then(
        (results) => console.log(results),
        (err) => console.error(err)
      );
    case InputActions.INPUT_DOWN:
      return connection.Input.Down().then(
        (results) => console.log(results),
        (err) => console.error(err)
      );
    case InputActions.INPUT_RIGHT:
      return connection.Input.Right().then(
        (results) => console.log(results),
        (err) => console.error(err)
      );
    case InputActions.INPUT_LEFT:
      return connection.Input.Left().then(
        (results) => console.log(results),
        (err) => console.error(err)
      );
    case InputActions.INPUT_ENTER:
      return connection.Input.Select().then(
        (results) => console.log(results),
        (err) => console.error(err)
      );
    case InputActions.INPUT_BACK:
      return connection.Input.Back().then(
        (results) => console.log(results),
        (err) => console.error(err)
      );
    case InputActions.INPUT_MENU:
      return connection.Input.ContextMenu().then(
        (results) => console.log(results),
        (err) => console.error(err)
      );
    case InputActions.INPUT_HOME:
      return connection.Input.Home().then(
        (results) => console.log(results),
        (err) => console.error(err)
      );
    case InputActions.INPUT_CONTEXT_MENU:
      return connection.Input.ContextMenu().then(
        (results) => console.log(results),
        (err) => console.error(err)
      );

    // Player
    case PlayerActions.PLAYER_OPEN_FILE:
      return connection.connection.Player.Open(action.params).then(
        (results) => console.log(results),
        (err) => console.error(err)
      );
    case PlayerActions.PLAYER_PLAY_PAUSE:
      return connection.Player.PlayPause(action.params).then(
        (results) => console.log(results),
        (err) => console.error(err)
      );
    case PlayerActions.PLAYER_STOP:
      return connection.Player.Stop(action.params).then(
        (results) => console.log(results),
        (err) => console.error(err)
      );

    // Library
    case LibraryActions.LIBRARY_GET_MOVIES:
      return connection.VideoLibrary.GetMovies();

    // Application
    case VolumeActions.AUDIO_SET_VOLUME:
      return connection.Application.SetVolume(action.params);
    default:
      return false;
  }
};

module.exports = KodiHandler;
