// Player
const playerParams = { playerid: 1 };

// Application
export const APPLICATION_QUIT = 'APPLICATION_QUIT';
export function applicationQuit() {
  return { type: APPLICATION_QUIT };
}

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

// Input
export const INPUT_UP = 'INPUT_UP';
export function inputUpAction() {
  return { type: INPUT_UP };
}

export const INPUT_DOWN = 'INPUT_DOWN';
export function inputDownAction() {
  return { type: INPUT_DOWN };
}

export const INPUT_RIGHT = 'INPUT_RIGHT';
export function inputRightAction() {
  return { type: INPUT_RIGHT };
}

export const INPUT_LEFT = 'INPUT_LEFT';
export function inputLeftAction() {
  return { type: INPUT_LEFT };
}

export const INPUT_ENTER = 'INPUT_ENTER';
export function inputEnter() {
  return { type: INPUT_ENTER };
}

export const INPUT_BACK = 'INPUT_BACK';
export function inputBack() {
  return { type: INPUT_BACK };
}

export const INPUT_MENU = 'INPUT_MENU';
export function inputMenu() {
  return { type: INPUT_MENU };
}

export const INPUT_HOME = 'INPUT_HOME';
export function inputHome() {
  return { type: INPUT_HOME };
}

export const INPUT_CONTEXT_MENU = 'INPUT_CONTEXT_MENU';
export function inputContextMenu() {
  return { type: INPUT_CONTEXT_MENU };
}

// Audio
export const AUDIO_MUTE = 'AUDIO_MUTE';
export function audioSetMute(isMuted) {
  return { type: AUDIO_MUTE, params: { mute: isMuted } };
}

export const AUDIO_SET_VOLUME = 'AUDIO_SET_VOLUME';
export function audioSetVolume(volumeValue) {
  return { type: AUDIO_SET_VOLUME, params: { volume: volumeValue } };
}

// Video library
export const LIBRARY_GET_MOVIES = 'LIBRARY_GET_MOVIES';
export function libraryGetMovies() {
  return { type: LIBRARY_GET_MOVIES };
}
