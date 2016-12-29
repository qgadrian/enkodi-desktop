import React, { PropTypes } from 'react';
import { mount } from 'enzyme';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import TVShows from '../../../app/components/tvshows/TVShows';
import TVShow from '../../../app/components/tvshows/TVShow';
import KodiHandler from '../../../app/utils/kodi/KodiHandler';

chai.should();
chai.use(sinonChai);
chai.use(chaiAsPromised);

const mockedTVShows = {
  tvshows: [
    { tvshowid: 1, title: 'tvshows 1', thumbnail: '' },
    { tvshowid: 2, title: 'tvshows 2', thumbnail: '' },
    { tvshowid: 3, title: 'tvshows 3', thumbnail: '' },
    { tvshowid: 4, title: 'tvshows 4', thumbnail: '' },
    { tvshowid: 5, title: 'tvshows 5', thumbnail: '' }
  ]
};

let stubHandleGetData;

const defaultProps = {
  connection: {
    client: undefined
  }
};

TVShows.propTypes = {
  enkodi: PropTypes.shape({})
};

describe('components: tvShows', () => {
  beforeEach(() => {
    stubHandleGetData = sinon.stub(KodiHandler.prototype, 'handleGetData').returns(
      new Promise((resolve) => resolve(mockedTVShows))
    );
  });

  afterEach(() => {
    KodiHandler.prototype.handleGetData.restore();
  });

  describe('view render', () => {
    it('should request tv shows', () => {
      mount(<TVShows enkodi={defaultProps} />);
      stubHandleGetData.should.have.been.calledOnce;
    });

    it('should show requested tv shows', () => {
      const wrapper = mount(<TVShows enkodi={defaultProps} />);

      return stubHandleGetData().then(() => {
        wrapper.update();
        return expect(wrapper.find(TVShow)).to.have.lengthOf(5);
      });
    });
  });

  describe('event state transitions', () => {
    it('should update the loading state when received the requested tv shows', () => {
      const wrapper = mount(<TVShows enkodi={defaultProps} />);

      expect(wrapper.state().loading).to.be.true;

      return stubHandleGetData().then(() => {
        wrapper.update();
        return expect(wrapper.state().loading).to.be.false;
      });
    });
  });
});
