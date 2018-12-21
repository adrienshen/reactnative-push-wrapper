const logger = require('logdown')('@simplewebsite');

export const postMessageNativeIfExists = message => {
  if (window.MOBILE_ENV === "REACT_IOS" && window.postMessage) {
    window.postMessage(JSON.stringify(message));
  } else if (window.MOBILE_ENV === "REACT_ANDROID" && window.postMessage) {
    window.postMessage(JSON.stringify(message));
  } else {
    // Wrapper not exist, continue as a website
    logger.info("Wrapper not exist, continue as a website");
    return;
  }
};

export const unsubscribeNativePush = () => {
  if (window.MOBILE_ENV === "REACT_IOS" && window.postMessage) {
    window.postMessage("WEB_LOGOUT");
  } else {
    // wrapper not exist, logging out as usual
    return;
  }
};
