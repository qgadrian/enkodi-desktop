export const CONNECT_AND_SAVE = 'CONNECT_AND_SAVE';
export function connect(name, host, port) {
  return {
    type: CONNECT_AND_SAVE,
    connection: {
      name,
      host,
      port
    }
  };
}

export const UPDATE_CONNECTION_NAME = 'UPDATE_CONNECTION_NAME';
export function connectionName(name) {
  return {
    type: UPDATE_CONNECTION_NAME,
    name
  };
}

export const UPDATE_CONNECTION_HOST = 'UPDATE_CONNECTION_HOST';
export function connectionHost(host) {
  return {
    type: UPDATE_CONNECTION_HOST,
    host
  };
}

export const UPDATE_CONNECTION_PORT = 'UPDATE_CONNECTION_PORT';
export function connectionPort(port) {
  return {
    type: UPDATE_CONNECTION_PORT,
    port
  };
}

export const SAVE_AND_CONNECT = 'SAVE_AND_CONNECT';
export function saveAndConnect(name, host, port, kodiHandler) {
  return {
    type: SAVE_AND_CONNECT,
    connection: {
      name,
      host,
      port,
      kodiHandler
    }
  };
}

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

export const ON_VOLUME_CHANGE = 'ON_VOLUME_CHANGE';
export function volumeChange(volumeValue) {
  return {
    type: ON_VOLUME_CHANGE,
    volumeValue
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
