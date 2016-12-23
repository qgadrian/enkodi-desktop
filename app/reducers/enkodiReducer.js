import {
  ON_PLAYER_STATUS_CHANGE,
  ON_PLAYER_STOP,
  ON_PLAYING_TVSHOW_EPISODE,
  ON_PLAYER_PLAY_DETAILS,
  ON_PLAYER_REFRESH_PLAY_TIME
} from '../actions/kodi/PlayerActions';
import {
  ON_VOLUME_CHANGE
} from '../actions/kodi/VolumeActions';
import {
  KODI_CONNECT,
  UPDATE_CONNECTION_NAME,
  UPDATE_CONNECTION_HOST,
  UPDATE_CONNECTION_PORT,
} from '../actions/kodi/ConnectionActions';

// TODO this default state will be almost empty
export const connectionInitialState = {
  info: {
    name: 'enkodi',
    host: '192.168.0.23',
    port: '9090',
  },
  connected: false
};

const playerInitialState = {
  playing: false,
  hasPlayTimeInfo: false,
  videoInfo: {},
  currentTime: {
    percentage: 0
  },
  volume: 100,
};

export const defaultState = {
  connection: connectionInitialState,
  player: playerInitialState
};

function connection(state = connectionInitialState, action: Object) {
  switch (action.type) {
    case KODI_CONNECT: {
      return Object.assign({}, state, {
        info: action.info,
        connected: true,
        client: action.kodiClient
      });
    }
    case UPDATE_CONNECTION_NAME:
      return Object.assign({}, state, {
        info: { name: action.name }
      });
    case UPDATE_CONNECTION_HOST:
      return Object.assign({}, state, {
        info: { host: action.host }
      });
    case UPDATE_CONNECTION_PORT:
      return Object.assign({}, state, {
        info: { port: action.port }
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
      switch (state.videoInfo.type) {
        case 'episode': {
          delete nextState.videoInfo.type;
          delete nextState.videoInfo.tvshow;
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
        videoInfo: {
          type: action.videoType,
          tvshow: {
            showTitle: action.showTitle,
            plot: action.plot,
            seasonNumber: action.seasonNumber,
            episodeName: action.episodeName,
            episodeNumber: action.episodeNumber,
            tvshowPoster: action.tvshowPoster
          }
        }
      });
    default:
      return state;
  }
}

export default function kodiReducer(state = {}, action) {
  return {
    connection: connection(state.connection, action),
    player: player(state.player, action)
  };
}
