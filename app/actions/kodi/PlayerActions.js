const playerParams = { playerid: 1 }; // TODO replicated const

// Properties
export const GET_PLAYER_PROPERTIES = 'GET_PLAYER_PROPERTIES';
const playerPropertiesFilter = {
  playerid: 1,
  properties: ['percentage', 'time', 'totaltime', 'audiostreams', 'subtitles']
};
export function getPlayerProperties() {
  return {
    type: GET_PLAYER_PROPERTIES,
    filter: playerPropertiesFilter
  };
}

export const GET_EPISODE_DETAILS = 'GET_EPISODE_DETAILS';
export function getEpisodeDetails(episodeId) {
  return {
    type: GET_EPISODE_DETAILS,
    filter: {
      episodeid: episodeId,
      properties: ['showtitle', 'title', 'season', 'episode']
    }
  };
}

// Inputs
export const PLAYER_PLAY_PAUSE = 'PLAYER_PLAY_PAUSE';
export function playerPlayPauseAction() {
  return { type: PLAYER_PLAY_PAUSE, params: playerParams };
}

export const PLAYER_STOP = 'PLAYER_STOP';
export function playerStopAction() {
  return { type: PLAYER_STOP, params: playerParams };
}

export const PLAYER_OPEN_FILE = 'PLAYER_OPEN_FILE';
export function playerOpenFile(file) {
  return { type: PLAYER_OPEN_FILE, params: { item: { file } } };
}

// Events
export const ON_PLAYER_STATUS_CHANGE = 'ON_PLAYER_STATUS_CHANGE';
export function playerStatusChange(isPlaying) {
  return {
    type: ON_PLAYER_STATUS_CHANGE,
    isPlaying
  };
}

export const ON_PLAYER_STOP = 'ON_PLAYER_STOP';
export function playerStop() {
  return {
    type: ON_PLAYER_STOP
  };
}

export const ON_PLAYER_PLAY_DETAILS = 'ON_PLAYER_PLAY_DETAILS';
export function playerPlayDetails(percentage, currentTime, totalTime) {
  return {
    type: ON_PLAYER_PLAY_DETAILS,
    percentage,
    currentTime: {
      hours: currentTime.hours,
      minutes: currentTime.minutes,
      seconds: currentTime.seconds,
      millis: currentTime.milliseconds
    },
    totalTime: {
      hours: totalTime.hours,
      minutes: totalTime.minutes,
      seconds: totalTime.seconds,
      millis: totalTime.milliseconds
    }
  };
}

export const ON_PLAYER_REFRESH_PLAY_TIME = 'ON_PLAYER_REFRESH_PLAY_TIME';
export function playerRefreshPlayTime(currentTime) {
  return {
    type: ON_PLAYER_REFRESH_PLAY_TIME,
    currentTime: {
      hours: currentTime.hours,
      minutes: currentTime.minutes,
      seconds: currentTime.seconds,
      millis: currentTime.millis
    }
  };
}

export const ON_PLAYING_TVSHOW_EPISODE = 'ON_PLAYING_TVSHOW_EPISODE';
export function playingTvshowEpisode(showTitle, seasonNumber, episodeName, episodeNumber) {
  return {
    type: ON_PLAYING_TVSHOW_EPISODE,
    videoType: 'episode',
    showTitle,
    seasonNumber,
    episodeName,
    episodeNumber
  };
}
