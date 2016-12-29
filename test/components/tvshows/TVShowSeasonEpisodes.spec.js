import React, { PropTypes } from 'react';
import { mount } from 'enzyme';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import TVShowSeasonEpisodes from '../../../app/components/tvshows/seasons/episodes/TVShowSeasonEpisodes';
import TVShowSeasonEpisode from '../../../app/components/tvshows/seasons/episodes/TVShowSeasonEpisode';
import KodiHandler from '../../../app/utils/kodi/KodiHandler';

chai.should();
chai.use(sinonChai);
chai.use(chaiAsPromised);

const mockedTVShowSeasonEpisodes = {
  episodes: [
    {
      title: 'episode 1 title',
      plot: 'episode 1 plot',
      thumbnail: 'tumbnail_path',
      season: 1,
      episode: 1,
      file: 'file_path',
      playcount: 0
    },
    {
      title: 'episode 2 title',
      plot: 'episode 2 plot',
      thumbnail: 'tumbnail_path',
      season: 1,
      episode: 2,
      file: 'file_path',
      playcount: 0
    }
  ]
};

let stubHandleGetData;

const defaultProps = {
  connection: {
    client: {
      VideoLibrary: {
        OnScanFinished: () => []
      }
    }
  }
};

TVShowSeasonEpisodes.propTypes = {
  enkodi: PropTypes.shape({}),
  onPlayEpisode: PropTypes.func,
};

describe('components: tvShowSeasonEpisodes', () => {
  beforeEach(() => {
    stubHandleGetData = sinon.stub(KodiHandler.prototype, 'handleGetData').returns(
      new Promise((resolve) => resolve(mockedTVShowSeasonEpisodes))
    );
  });

  afterEach(() => {
    KodiHandler.prototype.handleGetData.restore();
  });

  describe('view render', () => {
    it('should request tv show season episodes', () => {
      mount(<TVShowSeasonEpisodes enkodi={defaultProps} params={{ tvshowid: 23, season: 1 }} />);
      stubHandleGetData.should.have.been.calledOnce;
    });

    it('should show requested tv show season episodes', () => {
      const wrapper = mount(<TVShowSeasonEpisodes enkodi={defaultProps} params={{ tvshowid: 23, season: 1 }} />);

      return stubHandleGetData().then(() => {
        wrapper.update();
        return expect(wrapper.find(TVShowSeasonEpisode)).to.have.lengthOf(2);
      });
    });
  });

  describe('event state transitions', () => {
    it('should update the loading state when received the requested tv show season episodes', () => {
      const wrapper = mount(<TVShowSeasonEpisodes enkodi={defaultProps} params={{ tvshowid: 23, season: 1 }} />);

      expect(wrapper.state().loading).to.be.true;

      return stubHandleGetData().then(() => {
        wrapper.update();
        return expect(wrapper.state().loading).to.be.false;
      });
    });
  });
});
