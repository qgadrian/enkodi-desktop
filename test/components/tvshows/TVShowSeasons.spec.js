import React, { PropTypes } from 'react';
import { mount } from 'enzyme';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import TVShowSeasons from '../../../app/components/tvshows/seasons/TVShowSeasons';
import TVShowSeason from '../../../app/components/tvshows/seasons/TVShowSeason';
import KodiHandler from '../../../app/utils/kodi/KodiHandler';

chai.should();
chai.use(sinonChai);
chai.use(chaiAsPromised);

const mockedTVShowSeasons = {
  seasons: [
    { tvshowid: 23, season: 'season 1', thumbnail: '' },
    { tvshowid: 23, season: 'season 2', thumbnail: '' },
    { tvshowid: 23, season: 'season 3', thumbnail: '' },
    { tvshowid: 23, season: 'season 4', thumbnail: '' },
    { tvshowid: 23, season: 'season 5', thumbnail: '' }
  ]
};

let stubHandleGetData;

const defaultProps = {
  connection: {
    client: undefined
  }
};

TVShowSeasons.propTypes = {
  enkodi: PropTypes.shape({})
};

describe('components: tvShowSeasons', () => {
  beforeEach(() => {
    stubHandleGetData = sinon.stub(KodiHandler.prototype, 'handleGetData').returns(
      new Promise((resolve) => resolve(mockedTVShowSeasons))
    );
  });

  afterEach(() => {
    KodiHandler.prototype.handleGetData.restore();
  });

  describe('view render', () => {
    it('should request tv show seasons', () => {
      mount(<TVShowSeasons enkodi={defaultProps} params={{ tvshowid: 23 }} />);
      stubHandleGetData.should.have.been.calledOnce;
    });

    it('should show requested tv show seasons', () => {
      const wrapper = mount(<TVShowSeasons enkodi={defaultProps} params={{ tvshowid: 23 }} />);

      return stubHandleGetData().then(() => {
        wrapper.update();
        return expect(wrapper.find(TVShowSeason)).to.have.lengthOf(5);
      });
    });
  });

  describe('event state transitions', () => {
    it('should update the loading state when received the requested tv show seasons', () => {
      const wrapper = mount(<TVShowSeasons enkodi={defaultProps} params={{ tvshowid: 23 }} />);

      expect(wrapper.state().loading).to.be.true;

      return stubHandleGetData().then(() => {
        wrapper.update();
        return expect(wrapper.state().loading).to.be.false;
      });
    });
  });
});
