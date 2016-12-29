const InputActions = require('../../actions/kodi/InputActions');
const LibraryActions = require('../../actions/kodi/LibraryActions');
const VolumeActions = require('../../actions/kodi/VolumeActions');
const PlayerActions = require('../../actions/kodi/PlayerActions');
const kodiWs = require('kodi-ws');

const KodiHandler = function () {
  if (!(this instanceof KodiHandler)) return new KodiHandler();
};

KodiHandler.prototype.createConnection = (host, port, callback) => {
  console.info(`Connecting to Kodi in ${host}:${port}...`);
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

KodiHandler.prototype.handleGetData = (connection, action) => {
  switch (action.type) {
    case LibraryActions.LIBRARY_GET_TV_SHOWS:
      return connection.VideoLibrary.GetTVShows(action.filter);
    case LibraryActions.LIBRARY_GET_TV_SHOW_SEASONS:
      return connection.VideoLibrary.GetSeasons(action.filter);
    case LibraryActions.LIBRARY_GET_TV_SHOW_SEASON_EPISODES:
      return connection.VideoLibrary.GetEpisodes(action.filter);
    default: return null;
  }
};

KodiHandler.prototype.handleSendEvent = (connection, action) => {
  switch (action.type) {
    // Input
    case InputActions.INPUT_UP:
      connection.Input.Up().then().catch((err) => console.error(err)); break;
    case InputActions.INPUT_DOWN:
      connection.Input.Down().then().catch((err) => console.error(err)); break;
    case InputActions.INPUT_RIGHT:
      connection.Input.Right().then().catch((err) => console.error(err)); break;
    case InputActions.INPUT_LEFT:
      connection.Input.Left().then().catch((err) => console.error(err)); break;
    case InputActions.INPUT_ENTER:
      connection.Input.Select().then().catch((err) => console.error(err)); break;
    case InputActions.INPUT_BACK:
      connection.Input.Back().then().catch((err) => console.error(err)); break;
    case InputActions.INPUT_MENU:
      connection.Input.ContextMenu().then().catch((err) => console.error(err)); break;
    case InputActions.INPUT_HOME:
      connection.Input.Home().then().catch((err) => console.error(err)); break;
    case InputActions.INPUT_CONTEXT_MENU:
      connection.Input.ContextMenu().then().catch((err) => console.error(err)); break;

    // Player
    case PlayerActions.PLAYER_OPEN_FILE:
      connection.connection.Player.Open(action.params).then().catch((err) => console.error(err)); break;
    case PlayerActions.PLAYER_PLAY_PAUSE:
      connection.Player.PlayPause(action.params).then().catch((err) => console.error(err)); break;
    case PlayerActions.PLAYER_STOP:
      connection.Player.Stop(action.params).then().catch((err) => console.error(err)); break;

    // Application
    case VolumeActions.AUDIO_SET_VOLUME:
      connection.Application.SetVolume(action.params); break;
    default: break;
  }
};

module.exports = KodiHandler;
