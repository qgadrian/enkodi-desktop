export const ON_VOLUME_CHANGE = 'ON_VOLUME_CHANGE';
export function volumeChange(volumeValue) {
  return {
    type: ON_VOLUME_CHANGE,
    volumeValue
  };
}

export const AUDIO_MUTE = 'AUDIO_MUTE';
export function audioSetMute(isMuted) {
  return { type: AUDIO_MUTE, params: { mute: isMuted } };
}

export const AUDIO_SET_VOLUME = 'AUDIO_SET_VOLUME';
export function audioSetVolume(volumeValue) {
  return { type: AUDIO_SET_VOLUME, params: { volume: volumeValue } };
}
