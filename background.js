/*----- On click on a extension icon on a top right corner of a browser it sends message to open popup -----*/

chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.sendMessage(tab.id, { msg: "inject" });
});

/*----- Recieving message from Popup.js and closing chat -----*/

chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {
	if (req.msg == "closeChat") {
		chrome.tabs.query({ currentWindow: true }, function (tab) {
			$.each(tab, function (index, value) {
				console.log(value.url.indexOf("http://localhost:3000") > -1);
				if (value.url.indexOf("http://localhost:3000") > -1) {		
					chrome.tabs.remove(tab[index].id);
				}
			});
		});
	}
});