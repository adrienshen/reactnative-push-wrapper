
# React-Native Wrapper over Mobile Progressive Web

A demo of a ReactNative simple wrapper using webviews to wrap any web application such as a Progressive Web App. Implements Native Push Notifications using OneSignal triggered by the inner web application. 2 way communicate demonstrated.

## Communication between web Javascript and react native wrapper

The wrapped website sends messages to the outer ReactNative app using `window.postMessage`. Any data object can be passed, just make sure to `JSON.stringify` the message first. We can also decide to do something different depending on whether the wrapper is running on Android or iOS.

## Explain inner PWA

The wrapped application can be anything. Either a simpel website or ideally a Progressive Web App. It just needs to communicate to ReactNative using some Javascript. In this case, we can use Create React App, to make a simple PWA. We have a button and a text input that sends and message in the form of:

```
{
  type: "ACTION" // eg. "PUSH_SUBSCRIBE",
  payload: {
    // whatever you want
    foo: "bar"
  }
}
```

## Additional information

The parent wrapper can also interact with the inner web app by a couple of ways.

- Changing the URL and passing information to the webview url: `https://rnw-pn.firebaseapp.com/some-new-route?foo=bar`
  - The inner application would than catch and process the params data
- Injecting Javascript through the webview component: `injectedJavaScript="SOME_VAR = 'Hello'"`
  - We do this to set the mobile platform enviroment when the webview loads for instance

## Firebase and Apple Developer setup

To use this wrapper, you still need to setup your OneSignal Account, Firebase push credentials, and Apple Push Token. Links and resources are below:

- OneSignal: https://onesignal.com
- Firebase Messaging (FCM): https://documentation.onesignal.com/docs/generate-a-google-server-api-key
- Generate iOS Push Certificate: https://documentation.onesignal.com/docs/generate-an-ios-push-certificate

## Startup application

- `$ yarn install`
- Put your OneSignal token

## Environment variables

After creating OneSignal account and registering FCM and Apple tokens in OneSignal dashboard, we need to include the OneSignal token in the .env file like this:

```

OS_PUSH_TOKEN=<your-push-token>
OTHER_CONSTANTS=foo

```

## Links to source materials and helpful documentation

  - Installation for Android and iOS: https://documentation.onesignal.com/docs/react-native-sdk
  - Example simple website to be wrapped: https://rnw-pn.firebaseapp.com
  - https://medium.com/capriza-engineering/communicating-between-react-native-and-the-webview-ac14b8b8b91a