import React, { PropTypes } from 'react';
import { shallow, mount } from 'enzyme';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import SeekBar from 'rc-slider';
import Player from '../../../app/components/player/Player';
import PlayerControls from '../../../app/components/player/PlayerControls';
import VideoInfo from '../../../app/components/player/VideoInfo';
import KodiHandler from '../../../app/utils/kodi/KodiHandler';

chai.should();
chai.use(sinonChai);

const stubHandleSendEvent = sinon.stub(KodiHandler.prototype, 'handleSendEvent');

const stubOnRefreshPlayerTime = () => null;

const defaultPlayingProps = {
  player: {
    playing: false,
    hasPlayTimeInfo: false,
    currentTime: { hours: 0, minutes: 0, seconds: 0 }
  },
  connection: {
    client: undefined
  }
};

Player.propTypes = {
  onRefreshPlayerTime: PropTypes.func,
  onRefreshPlayerDetails: PropTypes.func,
  onPlayerSeek: PropTypes.func,
  enkodi: PropTypes.shape({})
};

describe('components: player', () => {
  describe('view render', () => {
    it('should contains a seekbar', () => {
      const wrapper = mount(<Player enkodi={defaultPlayingProps} onRefreshPlayerTime={stubOnRefreshPlayerTime} />);
      expect(wrapper.find(SeekBar)).to.have.lengthOf(1);
    });

    it('should contains the player controls', () => {
      const wrapper = mount(<Player enkodi={defaultPlayingProps} onRefreshPlayerTime={stubOnRefreshPlayerTime} />);
      expect(wrapper.find(PlayerControls)).to.have.lengthOf(1);
    });

    it('should contains the video info', () => {
      const wrapper = mount(<Player enkodi={defaultPlayingProps} onRefreshPlayerTime={stubOnRefreshPlayerTime} />);
      expect(wrapper.find(VideoInfo)).to.have.lengthOf(1);
    });
  });

  describe('event state transitions', () => {
    it('should request to the kodi client the play/pause action', () => {
      const player = shallow(<Player enkodi={defaultPlayingProps} />);
      const spyHandleOnPause = sinon.spy(player.instance(), 'handleOnPlayPause');

      player.instance().handleOnPlayPause();

      stubHandleSendEvent.should.have.been.calledAfter(spyHandleOnPause);
    });

    it('should request to the kodi client the stop action', () => {
      const player = shallow(<Player enkodi={defaultPlayingProps} />);
      const spyHandleOnStop = sinon.spy(player.instance(), 'handleOnStop');

      player.instance().handleOnStop();

      stubHandleSendEvent.should.have.been.calledAfter(spyHandleOnStop);
    });

    it('should request to the kodi client the stop action', () => {
      const player = shallow(<Player enkodi={defaultPlayingProps} />);
      const spyHandleOnStop = sinon.spy(player.instance(), 'handleOnStop');

      player.instance().handleOnStop();

      stubHandleSendEvent.should.have.been.calledAfter(spyHandleOnStop);
    });

    it('should start listening the playing status', () => {
      sinon.spy(Player.prototype, 'refreshCurrentPlayTime');
      mount(<Player enkodi={defaultPlayingProps} onRefreshPlayerTime={stubOnRefreshPlayerTime} />);
      Player.prototype.refreshCurrentPlayTime.should.have.been.calledOnce;
    });
  });
});
