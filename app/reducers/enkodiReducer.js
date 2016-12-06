import { CONNECT_AND_SAVE,
  UPDATE_CONNECTION_NAME,
  UPDATE_CONNECTION_HOST,
  UPDATE_CONNECTION_PORT,
  SAVE_AND_CONNECT,
  ON_PLAYER_STATUS_CHANGE,
  ON_PLAYER_STOP,
  ON_VOLUME_CHANGE,
  ON_PLAYING_TVSHOW_EPISODE,
  ON_PLAYER_PLAY_DETAILS,
  ON_PLAYER_REFRESH_PLAY_TIME
} from '../actions/EnkodiActions';

const connectionInitialState = {
  name: 'enkodi',
  host: '192.168.0.23',
  port: '9090',
};

const playerInitialState = {
  playing: false,
  hasPlayTimeInfo: false,
  currentTime: {
    percentage: 0
  },
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
    case ON_PLAYER_STOP: {
      const nextState = Object.assign({}, state, {
        playing: false,
        hasPlayTimeInfo: false,
        currentTime: {
          percentage: 0
        }
      });
      switch (state.type) {
        case 'episode': {
          delete nextState.type;
          delete nextState.tvshow;
          break;
        }
        default: break;
      }

      delete nextState.currentTime.hours;
      delete nextState.currentTime.minutes;
      delete nextState.currentTime.seconds;
      delete nextState.currentTime.millis;
      delete nextState.totalTime;

      return nextState;
    }
    case ON_PLAYER_PLAY_DETAILS:
      return Object.assign({}, state, {
        hasPlayTimeInfo: true,
        currentTime: {
          percentage: action.percentage,
          hours: action.currentTime.hours,
          minutes: action.currentTime.minutes,
          seconds: action.currentTime.seconds,
          millis: action.currentTime.millis
        },
        totalTime: {
          hours: action.totalTime.hours,
          minutes: action.totalTime.minutes,
          seconds: action.totalTime.seconds,
          millis: action.totalTime.millis
        }
      });
    case ON_PLAYER_REFRESH_PLAY_TIME:
      return Object.assign({}, state, {
        hasPlayTimeInfo: true,
        currentTime: {
          hours: action.currentTime.hours,
          minutes: action.currentTime.minutes,
          seconds: action.currentTime.seconds,
          millis: action.currentTime.millis
        }
      });
    case ON_VOLUME_CHANGE:
      return Object.assign({}, state, {
        volume: action.volumeValue
      });
    case ON_PLAYING_TVSHOW_EPISODE:
      return Object.assign({}, state, {
        type: action.videoType,
        tvshow: {
          showTitle: action.showTitle,
          seasonNumber: action.seasonNumber,
          episodeName: action.episodeName,
          episodeNumber: action.episodeNumber,
        }
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
