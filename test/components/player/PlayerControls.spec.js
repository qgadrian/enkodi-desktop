import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import PlayerControls from '../../../app/components/player/PlayerControls';

let playingStateMock = false;

function spyOnPlayPause() { playingStateMock = !playingStateMock; }

function spyOnStop() { playingStateMock = false; }

describe('components: playerControls', () => {
  beforeEach(() => {
    playingStateMock = false;
  });

  describe('view render', () => {
    it('should renders four buttons', () => {
      playingStateMock = true;

      const wrapper = shallow(
        <PlayerControls playing={playingStateMock} onStop={sinon.spy()} onPlayPause={sinon.spy()} />
      );

      expect(wrapper.find('button')).to.have.lengthOf(4);
    });
  });

  describe('event state transitions', () => {
    it('should change playing state when pressed play/pause', () => {
      const wrapper = shallow(<PlayerControls playing={false} onPlayPause={spyOnPlayPause} onStop={spyOnStop} />);

      wrapper.find('button.play_pause').simulate('click');
      expect(playingStateMock).to.be.true;
      wrapper.find('button.play_pause').simulate('click');
      expect(playingStateMock).to.be.false;
    });

    it('should change playing state when pressed stop', () => {
      const wrapper = shallow(<PlayerControls playing={false} onStop={spyOnStop} onPlayPause={spyOnPlayPause} />);
      wrapper.find('button.stop').simulate('click');
      expect(playingStateMock).to.be.false;

      playingStateMock = true;
      expect(playingStateMock).to.be.true;

      wrapper.find('button.stop').simulate('click');
      expect(playingStateMock).to.be.false;
    });
  });
});
