// @flow
import React, { Component, PropTypes } from 'react';
import VolumeSlider from 'rc-slider';

const kodiApiActions = require('../actions/KodiApiActions');

// TODO check leaks when gc deferrences this remote object
const mainWindow = require('electron').remote.getCurrentWindow();
const globalShortcut = require('electron').remote.globalShortcut;

class Controller extends Component {

  static propTypes = {
    onVolumeChange: PropTypes.func.isRequired,
    enkodi: PropTypes.shape({
      connection: PropTypes.shape({
        name: PropTypes.string.isRequired,
        host: PropTypes.string.isRequired,
        port: PropTypes.string.isRequired
      }).isRequired,
      kodiHandler: PropTypes.object.isRequired,
      player: PropTypes.shape({
        volume: PropTypes.number.isRequired
      }).isRequired,
    }).isRequired
  };

  componentDidMount() {
    const self = this;

    if (mainWindow.isFocused()) {
      this.registerKeyEvents(globalShortcut);
    }

    mainWindow.on('focus', () => { console.log('on focus'); self.registerKeyEvents(globalShortcut); });

    mainWindow.on('blur', () => { console.log('lost focus'); self.unregisterKeyEvents(globalShortcut); });
  }

  componentDidUmount() {
    this.unregisterKeyEvents(globalShortcut);
  }

  registerKeyEvents(keyListener) {
    const self = this;

    keyListener.register('Up', () => {
      self.handleOnUp();
    });

    keyListener.register('Down', () => {
      self.handleOnDown();
    });

    keyListener.register('Right', () => {
      self.handleOnRight();
    });

    keyListener.register('Left', () => {
      self.handleOnLeft();
    });

    keyListener.register('Enter', () => {
      self.handleOnEnter();
    });

    keyListener.register('Tab', () => {
      self.handleOnMenu();
    });

    keyListener.register('Backspace', () => {
      self.handleOnBack();
    });

    keyListener.register('CommandOrControl+Q', () => {
      self.handleOnContextMenu();
    });

    keyListener.register('PageUp', () => {
      self.handleVolumeChange(this.props.enkodi.player.volume + 10);
    });

    keyListener.register('PageDown', () => {
      self.handleVolumeChange(this.props.enkodi.player.volume - 10);
    });

    keyListener.register('CommandOrControl+U', () => {
      self.handleScanLibrary();
    });
  }

  unregisterKeyEvents(keyListener) {
    keyListener.unregisterAll();
  }

  handleOnUp() {
    this.props.enkodi.kodiHandler.handleSendEvent(kodiApiActions.inputUpAction());
  }

  handleOnDown() {
    this.props.enkodi.kodiHandler.handleSendEvent(kodiApiActions.inputDownAction());
  }

  handleOnRight() {
    this.props.enkodi.kodiHandler.handleSendEvent(kodiApiActions.inputRightAction());
  }

  handleOnLeft() {
    this.props.enkodi.kodiHandler.handleSendEvent(kodiApiActions.inputLeftAction());
  }

  handleOnEnter() {
    this.props.enkodi.kodiHandler.handleSendEvent(kodiApiActions.inputEnter());
  }

  handleOnMenu() {
    this.props.enkodi.kodiHandler.handleSendEvent(kodiApiActions.inputMenu());
  }

  handleOnBack() {
    this.props.enkodi.kodiHandler.handleSendEvent(kodiApiActions.inputBack());
  }

  handleOnHome() {
    this.props.enkodi.kodiHandler.handleSendEvent(kodiApiActions.inputHome());
  }

  handleOnContextMenu() {
    this.props.enkodi.kodiHandler.handleSendEvent(kodiApiActions.inputContextMenu());
  }

  handleScanLibrary() {
    this.props.enkodi.kodiHandler.connection.VideoLibrary.Scan();
  }

  handleVolumeChange(volumeValue) {
    this.props.enkodi.kodiHandler.handleSendEvent(kodiApiActions.audioSetVolume(volumeValue));
    this.props.onVolumeChange(volumeValue);
  }

  handleChange(volumeValue) {
    this.props.onVolumeChange(volumeValue);
  }

  render() {
    const { name, host, port } = this.props.enkodi.connection;

    return (
      <div className="controller_container">
        <p>Connected to {name} at {host}:{port}</p>

        <div className="volume">
          <span className="label">Volume</span>
          <VolumeSlider
            min={0} max={100} defaultValue={30} step={1}
            value={this.props.enkodi.player.volume}
            tipFormatter={null}
            onChange={this.handleChange.bind(this)}
            onAfterChange={this.handleVolumeChange.bind(this)}
          />
        </div>

        <div className="control_buttons">
          <div className="input">
            <div className="row">
              <button className="up" onClick={this.handleOnUp.bind(this)}>Up</button>
            </div>
            <div className="row">
              <button className="left" onClick={this.handleOnLeft.bind(this)}>Left</button>
              <button className="enter" onClick={this.handleOnEnter.bind(this)}>Enter</button>
              <button className="right" onClick={this.handleOnRight.bind(this)}>Right</button>
            </div>
            <div className="row">
              <button className="down" onClick={this.handleOnDown.bind(this)}>Down</button>
            </div>
          </div>

          <div className="actions">
            <div className="row">
              <button className="back" onClick={this.handleOnBack.bind(this)} />
              <button className="home" onClick={this.handleOnHome.bind(this)} />
              <button className="menu" onClick={this.handleOnMenu.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Controller;
