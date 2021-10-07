/*----- Get Url and send this url to popup -----*/

chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {
  if (req.msg == "getUrl") {
    var url = window.location.href;
    sendResponse(url);
  }
  return true;
});