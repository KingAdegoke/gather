/*----- On Message append popup, send url and remove popup -----*/

chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {
  if (req.msg == "inject") {
    reappend_frame();
  }
  if (req.msg == "getUrl") {
  	var url = window.location.href;
  	sendResponse(url);
  }
  if (req.msg == "closePopup") {
  	$("#extIframe").remove();
  }
  return true;
});

/*----- Inject Popup in a iframe of a content script, because of that popup will become a part of a content script -----*/

function reappend_frame(){
  if ($("#extIframe").length) {
    $("#extIframe").remove();
  } else {
    var popup = chrome.extension.getURL("popup.html");
    var iframe = $("<iframe/>", { id: "extIframe" }).attr("src", popup);
    iframe.css({
      width: "350px",
      height: "452px",
      border: "1px solid #ddd",
      boxShadow: "0 0 10px #CCC",
      zIndex: 9999999999,
      position: "fixed",
      top: "10px",
      right: "10px",
      overflowX: "hidden"
    });

    iframe.appendTo("body");
  }
}