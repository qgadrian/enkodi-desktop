import { expect, assert } from 'chai';
import enkodiReducer, { defaultState } from '../../app/reducers/enkodiReducer';

const VolumeActions = require('../../app/actions/kodi/VolumeActions.js');
const ConnectionActions = require('../../app/actions/kodi/ConnectionActions.js');
const PlayerActions = require('../../app/actions/kodi/PlayerActions.js');

describe('reducers', () => {
  describe('enkodiReducer', () => {
    it('should handle initial state', () => {
      expect(enkodiReducer(undefined, {})).to.deep.equal(defaultState);
    });
  });

  describe('connection reducers', () => {
    it('should update the name state', () => {
      const name = 'a name';
      const nextNameState = enkodiReducer({}, ConnectionActions.connectionName(name));
      assert.equal(nextNameState.connection.info.name, name);
      assert.isFalse(nextNameState.connection.connected);
    });

    it('should update the host state', () => {
      const host = 'a host path';
      const nextHostState = enkodiReducer({}, ConnectionActions.connectionHost(host));
      assert.equal(nextHostState.connection.info.host, host);
      assert.isFalse(nextHostState.connection.connected);
    });

    it('should update the host state', () => {
      const port = 2323;
      const nextPortState = enkodiReducer({}, ConnectionActions.connectionPort(port));
      assert.equal(nextPortState.connection.info.port, port);
      assert.isFalse(nextPortState.connection.connected);
    });

    it('should create the client when connected to a host', () => {
      const name = 'a name';
      const host = 'a host path';
      const port = 2323;
      const client = {};

      const nextConnectedState = enkodiReducer({}, ConnectionActions.kodiConnect(name, host, port, client));

      assert.equal(nextConnectedState.connection.info.name, name);
      assert.equal(nextConnectedState.connection.info.host, host);
      assert.equal(nextConnectedState.connection.info.port, port);
      assert.isTrue(nextConnectedState.connection.connected);
      expect(nextConnectedState.connection.client).to.not.be.undefined;
    });
  });

  describe('player reducers', () => {
    it('should handle initial state', () => {
      expect(enkodiReducer(undefined, {})).to.deep.equal(defaultState);
    });

    it('should handle on volume change event', () => {
      const volume = 23;
      const nextState = enkodiReducer({}, VolumeActions.volumeChange(volume));
      expect(nextState.player.volume).to.deep.equal(volume);
    });

    it('should handle on player playing states', () => {
      let nextPlayingState = enkodiReducer({}, PlayerActions.playerStatusChange(true));
      assert.isTrue(nextPlayingState.player.playing);

      nextPlayingState = enkodiReducer({}, PlayerActions.playerStatusChange(false));
      assert.isFalse(nextPlayingState.player.playing);
      expect(nextPlayingState).to.deep.equal(defaultState);
    });

    it('should handle player status on stop player', () => {
      const playingState = enkodiReducer({}, PlayerActions.playerStatusChange(true));
      playingState.player.hasPlayTimeInfo = true;

      assert.isTrue(playingState.player.hasPlayTimeInfo);
      assert.isTrue(playingState.player.playing);

      assert.isFalse(defaultState.player.hasPlayTimeInfo);
      assert.isFalse(defaultState.player.playing);

      const stoppedState = enkodiReducer(playingState, PlayerActions.playerStop());
      assert.isFalse(stoppedState.player.hasPlayTimeInfo);
      assert.isFalse(stoppedState.player.playing);
    });

    it('should remove any info for current and total time on stop player', () => {
      const playingState = enkodiReducer({}, PlayerActions.playerStatusChange(true));
      playingState.player.hasPlayTimeInfo = true;
      playingState.player.currentTime = { percentage: 50, hours: 23, minutes: 23, seconds: 23, millis: 23 };
      playingState.player.totalTime = { hours: 23, minutes: 23, seconds: 23, millis: 23 };

      assert.isTrue(playingState.player.playing);

      const stoppedState = enkodiReducer(playingState, PlayerActions.playerStop());

      assert.isFalse(stoppedState.player.playing);
      assert.isFalse(stoppedState.player.hasPlayTimeInfo);
      expect(stoppedState.player.currentTime).to.deep.equal({ percentage: 0 });
    });

    it('should remove any info for playing tvshow on stop player', () => {
      const playingState = enkodiReducer({}, PlayerActions.playerStatusChange(true));
      playingState.player.hasPlayTimeInfo = true;
      playingState.player.videoInfo.type = 'episode';
      playingState.player.videoInfo.tvshow = { showTitle: 'test', plot: 'test' };

      assert.isTrue(playingState.player.playing);
      assert.isTrue(playingState.player.hasPlayTimeInfo);
      expect(playingState.player.videoInfo.tvshow).to.not.be.undefined;
      assert.equal(playingState.player.videoInfo.type, 'episode');

      const stoppedState = enkodiReducer(playingState, PlayerActions.playerStop());

      assert.isFalse(stoppedState.player.playing);
      assert.isFalse(stoppedState.player.hasPlayTimeInfo);
      expect(stoppedState.player.currentTime).to.deep.equal({ percentage: 0 });
      expect(stoppedState.player.videoInfo.tvshow).to.be.undefined;
    });

    it('should update all playing time info', () => {
      const percentage = 85;
      const currentTime = { percentage, hours: 23, minutes: 23, seconds: 23, millis: 23 };
      const totalTime = { hours: 23, minutes: 23, seconds: 23, millis: 23 };

      assert.isFalse(defaultState.player.hasPlayTimeInfo);

      const updatedPlayInfoState = enkodiReducer({},
        PlayerActions.playerPlayDetails(percentage, currentTime, totalTime));

      expect(updatedPlayInfoState.player.totalTime).to.not.be.undefined;
      expect(updatedPlayInfoState.player.currentTime).to.not.be.undefined;

      assert.equal(updatedPlayInfoState.player.currentTime.percentage, percentage);
      assert.isTrue(updatedPlayInfoState.player.hasPlayTimeInfo);
      expect(updatedPlayInfoState.player.currentTime).to.deep.equal(currentTime);
      expect(updatedPlayInfoState.player.totalTime).to.deep.equal(totalTime);
    });

    it('should update current playing time info (without refreshing percentage)', () => {
      const currentTime = { hours: 24, minutes: 32, seconds: 16, millis: 33 };

      assert.isFalse(defaultState.player.hasPlayTimeInfo);

      const updatedPlayInfoState = enkodiReducer({}, PlayerActions.playerRefreshPlayTime(currentTime));

      expect(updatedPlayInfoState.player.currentTime).to.not.be.undefined;

      assert.isTrue(updatedPlayInfoState.player.hasPlayTimeInfo);
      expect(updatedPlayInfoState.player.currentTime).to.deep.equal(currentTime);
    });

    it('should update tvshow info when playing an episode', () => {
      const tvShowInfo = {
        showTitle: 'The Tvshow title',
        plot: 'The plot',
        seasonNumber: 5,
        episodeName: 'Episode name',
        episodeNumber: 23,
        tvshowPoster: 'A url to the poster image'
      };

      const withTvShowInfoState = enkodiReducer({},
        PlayerActions.playingTvshowEpisode(tvShowInfo.showTitle, tvShowInfo.plot, tvShowInfo.seasonNumber,
          tvShowInfo.episodeName, tvShowInfo.episodeNumber, tvShowInfo.tvshowPoster));

      assert.equal(withTvShowInfoState.player.videoInfo.type, 'episode');
      expect(withTvShowInfoState.player.videoInfo.tvshow).to.deep.equal(tvShowInfo);
    });
  });
});
