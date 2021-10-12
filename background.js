/*----- On click on a extension icon on a top right corner of a browser it sends message to open popup -----*/

chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.sendMessage(tab.id, { msg: "inject" });
});
