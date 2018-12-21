/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { AppRegistry, Platform } from "react-native";
import OneSignal from "react-native-onesignal";
import MyInlineWeb from "./webviewcontainer";

const ONESIGNAL_TOKEN = "a58ca839-9e6a-43a9-8d27-489540407383";

export default class OneSignalWrapper extends Component {
  constructor(properties) {
    super(properties);

    OneSignal.setLogLevel(7, 0); // VERBOSE

    let requiresConsent = false;

    this.state = {
      jsonDebugText: "",
      privacyButtonTitle: "Privacy Consent: Not Granted"
    };

    OneSignal.setRequiresUserPrivacyConsent(requiresConsent);
  }

  async componentDidMount() {}

  componentWillUnmount() {
    OneSignal.removeEventListener("received", this.onReceived);
    OneSignal.removeEventListener("opened", this.onOpened);
    OneSignal.removeEventListener("ids", this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);

    this.setState({
      jsonDebugText: "RECEIVED: \n" + JSON.stringify(notification, null, 2)
    });
  }

  onOpened(openResult) {
    console.log("Message: ", openResult.notification.payload.body);
    console.log("Data: ", openResult.notification.payload.additionalData);
    console.log("isActive: ", openResult.notification.isAppInFocus);
    console.log("openResult: ", openResult);

    this.setState({
      jsonDebugText:
        "OPENED: \n" + JSON.stringify(openResult.notification, null, 2)
    });
  }

  onIds(device) {
    console.log("Device info: ", device);
  }

  handleWebViewMessage = message => {
    console.log("2. Webview saids: ", message);
    const m = JSON.parse(message);
    if (m && m.type === "SUBSCRIBE_PUSH") {
      this.triggerSubscribeNativePush();
    } else {
      console.log("Some other event");
    }
  };

  triggerSubscribeNativePush = async () => {
    console.log("3. register OneSignal begins");
    // Do OneSignal stuff
    await OneSignal.init(ONESIGNAL_TOKEN, { kOSSettingsKeyAutoPrompt: true });
    var providedConsent = await OneSignal.userProvidedPrivacyConsent();
    console.log("providedConsent: ", providedConsent);

    this.setState({
      privacyButtonTitle: `Privacy Consent: ${
        providedConsent ? "Granted" : "Not Granted"
      }`,
      privacyGranted: providedConsent
    });

    OneSignal.setLocationShared(true);
    OneSignal.inFocusDisplaying(2);

    this.onReceived = this.onReceived.bind(this);
    this.onOpened = this.onOpened.bind(this);
    this.onIds = this.onIds.bind(this);

    OneSignal.addEventListener("received", this.onReceived);
    OneSignal.addEventListener("opened", this.onOpened);
    OneSignal.addEventListener("ids", this.onIds);

    alert("Push subscribed");
  };

  render() {
    return <MyInlineWeb handleWebViewMessage={this.handleWebViewMessage} />;
  }
}

AppRegistry.registerComponent("OneSignalWrapper", () => OneSignalWrapper);
