import { CONNECT_AND_SAVE,
  UPDATE_CONNECTION_NAME,
  UPDATE_CONNECTION_HOST,
  UPDATE_CONNECTION_PORT,
  SAVE_AND_CONNECT,
  ON_PLAYER_STATUS_CHANGE,
  ON_VOLUME_CHANGE
} from '../actions/EnkodiActions';

const connectionInitialState = {
  name: 'enkodi',
  host: '192.168.0.23',
  port: '9090',
};

const playerInitialState = {
  playing: false,
  title: '',
  image: '',
  volume: 100,
};

function connection(state = connectionInitialState, action: Object) {
  switch (action.type) {
    case CONNECT_AND_SAVE:
      return Object.assign({}, state, {
        connection: action.connection
      });
    case UPDATE_CONNECTION_NAME:
      return Object.assign({}, state, {
        name: action.name
      });
    case UPDATE_CONNECTION_HOST:
      return Object.assign({}, state, {
        name: action.host
      });
    case UPDATE_CONNECTION_PORT:
      return Object.assign({}, state, {
        name: action.port
      });
    case SAVE_AND_CONNECT:
      return Object.assign({}, state, {
        name: action.connection.name,
        host: action.connection.host,
        port: action.connection.port
      });
    default:
      return state;
  }
}

function player(state = playerInitialState, action: Object) {
  switch (action.type) {
    case ON_PLAYER_STATUS_CHANGE:
      return Object.assign({}, state, {
        playing: action.isPlaying
      });
    case ON_VOLUME_CHANGE:
      return Object.assign({}, state, {
        volume: action.volumeValue
      });
    default:
      return state;
  }
}

function kodiHandler(state = {}, action: Object) {
  switch (action.type) {
    case SAVE_AND_CONNECT:
      return action.connection.kodiHandler;
    default:
      return state;
  }
}

export default function kodiReducer(state = {}, action) {
  return {
    connection: connection(state.connection, action),
    player: player(state.player, action),
    kodiHandler: kodiHandler(state.kodiHandler, action)
  };
}
