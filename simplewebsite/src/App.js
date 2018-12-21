import React, { Component } from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { postMessageNativeIfExists } from './utils/native-helpers';
const logger = require('logdown')('@simplewebsite');

class App extends Component {
  constructor() {
    super()
    this.state = {
      inputMessage: "",
    }
  }

  postMessageReactNative = () => {
    logger.info(`Posting message ${this.state.inputMessage}`);

    // Prepare a standardize message format
    const Message = {
      type: "SUBSCRIBE_PUSH",
      payload: {
        message: this.state.inputMessage,
      }
    };
    postMessageNativeIfExists(Message);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Inner pwa - webview ({window.MOBILE_ENV})</h2>
          <span>Message = {this.state.inputMessage}</span>
          <TextField
            onChange={(e) => this.setState({ inputMessage: e.target.value })}
            value={this.state.inputMessage}
            id="standard-full-width"
            label="Label"
            style={{ margin: 8 }}
            placeholder="Placeholder"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <p>
            Click this button to send message to outer react native wrapper. Once wrapper receives, will redirect webview to success page as part of the demo
          </p>
          <Button onClick={this.postMessageReactNative}
            variant="contained">
            Send message/token
          </Button>
          <br />
          {/* <p>
            Click this button to unsubscribe from native push demo
          </p>
          <Button onClick={this.postMessageReactNative}
            variant="contained">
            Unsubscribe
          </Button> */}
        </header>
      </div>
    );
  }
}

export default App;
