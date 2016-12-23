import React from 'react';
import { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import VideoInfo from '../../../app/components/player/VideoInfo';

chai.use(chaiEnzyme());

const tvShowEpisodeInfo = {
  type: 'episode',
  tvshow: {
    showTitle: 'A show title',
    plot: 'A plot',
    seasonNumber: 1,
    episodeName: 'An episode name',
    episodeNumber: 23,
    tvshowPoster: 'image_url',
  }
};

describe('components: video info', () => {
  describe('view render', () => {
    it('should renders the detail information', () => {
      const wrapper = shallow(<VideoInfo videoInfo={tvShowEpisodeInfo} />);

      expect(wrapper.find('div#detail')).to.have.lengthOf(1);
      expect(wrapper.find('div.poster')).to.have.lengthOf(1);
      expect(wrapper.find('div.info')).to.have.lengthOf(1);
      expect(wrapper.find('span.title')).to.have.lengthOf(1);
      expect(wrapper.find('span.name')).to.have.lengthOf(1);
      expect(wrapper.find('span.season')).to.have.lengthOf(1);
      expect(wrapper.find('span.plot')).to.have.lengthOf(1);
    });

    it('should render nothing when there is no video information', () => {
      const wrapper = shallow(<VideoInfo videoInfo={null} />);
      expect(wrapper.find('div#detail')).to.have.lengthOf(0);
    });
  });

  describe('render video info details', () => {
    it('should show the tv show video info when the episode details are provided', () => {
      const wrapper = shallow(<VideoInfo videoInfo={tvShowEpisodeInfo} />);

      expect(wrapper.find('div.poster > img.poster')).to.have.attr('src', tvShowEpisodeInfo.tvshow.tvshowPoster);
      expect(wrapper.find('div.title > span.title')).to.have.text(tvShowEpisodeInfo.tvshow.showTitle);
      expect(wrapper.find('div.episode > span.name')).to.have.text(tvShowEpisodeInfo.tvshow.episodeName);
      // TODO check season and number
      expect(wrapper.find('div.plot > span.plot')).to.have.text(tvShowEpisodeInfo.tvshow.plot);
    });
  });
});
