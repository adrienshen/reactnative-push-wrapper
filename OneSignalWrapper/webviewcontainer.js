import React, { Component } from "react";
import { WebView, Platform } from "react-native";
console.log("Platform: ", Platform.OS);

class MyInlineWeb extends Component {
  render() {
    const injectedJs =
      Platform.OS === "ios"
        ? "window.MOBILE_ENV = 'REACT_IOS'"
        : "window.MOBILE_ENV = 'REACT_ANDROID'";
    const uri = "https://facebook.github.io/react-native/docs/getting-started";
    const app = "https://rnw-pn.firebaseapp.com/";
    return (
      <WebView
        source={{ uri: app }}
        originWhitelist={["*"]}
        injectedJavaScript={injectedJs}
        useWebKit={true}
        onMessage={event =>
          this.props.handleWebViewMessage(event.nativeEvent.data)
        }
      />
    );
  }
}

export default MyInlineWeb;
