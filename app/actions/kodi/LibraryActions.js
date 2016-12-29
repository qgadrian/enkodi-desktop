export const LIBRARY_GET_MOVIES = 'LIBRARY_GET_MOVIES';
export function libraryGetMovies() {
  return { type: LIBRARY_GET_MOVIES };
}

export const LIBRARY_GET_TV_SHOWS = 'LIBRARY_GET_TV_SHOWS';
const tvShowsProperties = {
  properties: ['title', 'thumbnail']
};
export function libraryGetTVShows() {
  return {
    type: LIBRARY_GET_TV_SHOWS,
    filter: tvShowsProperties
  };
}

export const LIBRARY_GET_TV_SHOW_SEASONS = 'LIBRARY_GET_TV_SHOW_SEASONS';
const tvShowSeasonsProperties = {
  properties: ['tvshowid', 'season', 'thumbnail']
};
export function libraryGetTVShowSeasons(tvshowid) {
  return {
    type: LIBRARY_GET_TV_SHOW_SEASONS,
    filter: {
      tvshowid,
      properties: tvShowSeasonsProperties.properties
    }
  };
}

export const LIBRARY_GET_TV_SHOW_SEASON_EPISODES = 'LIBRARY_GET_TV_SHOW_SEASON_EPISODES';
const tvShowSeasonEpisodesProperties = {
  properties: ['title', 'plot', 'episode', 'showtitle', 'season', 'file', 'thumbnail', 'playcount']
};
export function libraryGetTVShowSeasonEpisodes(tvshowid, season) {
  return {
    type: LIBRARY_GET_TV_SHOW_SEASON_EPISODES,
    filter: {
      tvshowid,
      season,
      properties: tvShowSeasonEpisodesProperties.properties
    }
  };
}
