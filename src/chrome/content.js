//this tells webpack to ignore the chrome variable
/*global chrome*/
import {Sender} from "../types";

function isAppMessage(message, sender) {
    return sender.id === chrome.runtime.id &&
        message.from === Sender.React;
}

/**
 * this is React calling the chrome extension, you can put a json in the message to process actions or display information
 * @param message actually the text is in message.message
 * @param response a function to call with a feedback return
 */
function processMessage(message, response) {
    console.log('received: ', message.message);
    response('Message processes in content.js');
}

const messagesFromReactAppListener = (message, sender, response) => {
    console.log('[content.js]. Message received', {
        message,
        sender,
    })
    if (isAppMessage(message, sender)) {
        processMessage(message, response);
    }
}

console.log('content js loaded, registering message listener');

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);