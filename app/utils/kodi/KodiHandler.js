const KodiApiActions = require('../../actions/KodiApiActions');
const kodiWs = require('kodi-ws');

const KodiHandler = function KodiHandler(host, port, onConnectedCallback) {
  const self = this;

  console.log(`Connecting to Kodi in ${host}:${port}...`);

  kodiWs(host, port).then(
    (connection) => {
      console.log('Enkodi succesfully connected to Kodi');
      self.connection = connection;
      onConnectedCallback(connection);
    },
    (err) => console.log(err)
  ).catch((error) => console.error(error));
};

KodiHandler.prototype.handleSendEvent = function handleSendEvent(action) {
  switch (action.type) {
    // Player
    case KodiApiActions.PLAYER_PLAY_PAUSE:
      return this.connection.Player.PlayPause(action.params).then(
        (results) => console.log(results),
        (err) => console.log(err)
      );
    case KodiApiActions.PLAYER_STOP:
      return this.connection.Player.Stop(action.params).then(
        (results) => console.log(results),
        (err) => console.log(err)
      );

    // Input
    case KodiApiActions.INPUT_UP:
      return this.connection.Input.Up().then(
        (results) => console.log(results),
        (err) => console.log(err)
      );
    case KodiApiActions.INPUT_DOWN:
      return this.connection.Input.Down().then(
        (results) => console.log(results),
        (err) => console.log(err)
      );
    case KodiApiActions.INPUT_RIGHT:
      return this.connection.Input.Right().then(
        (results) => console.log(results),
        (err) => console.log(err)
      );
    case KodiApiActions.INPUT_LEFT:
      return this.connection.Input.Left().then(
        (results) => console.log(results),
        (err) => console.log(err)
      );
    case KodiApiActions.INPUT_ENTER:
      return this.connection.Input.Select().then(
        (results) => console.log(results),
        (err) => console.log(err)
      );
    case KodiApiActions.INPUT_BACK:
      return this.connection.Input.Back().then(
        (results) => console.log(results),
        (err) => console.log(err)
      );
    case KodiApiActions.INPUT_MENU:
      return this.connection.Input.ContextMenu().then(
        (results) => console.log(results),
        (err) => console.log(err)
      );
    case KodiApiActions.INPUT_HOME:
      return this.connection.Input.Home().then(
        (results) => console.log(results),
        (err) => console.log(err)
      );
    case KodiApiActions.INPUT_CONTEXT_MENU:
      return this.connection.Input.ContextMenu().then(
        (results) => console.log(results),
        (err) => console.log(err)
      );

    // Player
    case KodiApiActions.PLAYER_OPEN_FILE:
      return this.connection.connection.Player.Open(action.params).then(
        (results) => console.log(results),
        (err) => console.log(err)
      );

    // Library
    case KodiApiActions.LIBRARY_GET_MOVIES:
      return this.connection.VideoLibrary.GetMovies();

    // Application
    case KodiApiActions.AUDIO_SET_VOLUME:
      return this.connection.Application.SetVolume(action.params);
    default:
      return false;
  }
};

module.exports = KodiHandler;
