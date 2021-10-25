/*----- Send Message on opening of a popup to get updated url and set and save this url in local storage of chrome extension -----*/

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { msg: "getUrl" }, function (response) {
        if (response !== undefined && response.indexOf("https://www.youtube.com/watch") > -1) {
            $("#generated").text(response);
            chrome.storage.local.set({
                "link": response
            });
        } 
    });
});        

/*----- For Closing Popup -----*/

$("#close").click(function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { msg: "closePopup" });
    });        
});

/*----- copy generated link to clipboard -----*/

$(".copy").click(function() {
    copyDivToClipboard();
    $(this).css("color","#17a2b8");
});

/*----- On click chat -----*/

$("#chat").click(function() {
    $("#start-chat").hide();
    $(".chat-area").show();
    $(".message-box").show();
    $(".message-box").css("display","flex");
    chrome.storage.local.set({
        "open": "true"
    });
    window.open("http://localhost:3000");
});

/*----- To close chat -----*/

$("#close-chat").click(function() {
    chrome.runtime.sendMessage({ msg: "closeChat" });
    $("#start-chat").show();
    $(".chat-area").hide();
    $(".message-box").hide();
    $(".message-box").css("display","none");
    chrome.storage.local.set({
        "open": "false"
    });
});

/*----- Sending message to content.js for the Link which generates when clicked on start gathering -----*/

$("#gather").click(function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { msg: "getUrl" }, function (response) {
            console.log(response);
            if (response.indexOf("https://www.youtube.com/watch") > -1) {
                $("#generated").text(response);
                $(".success").show();
                $(".start-gather").hide();
                $(".foot").css("height", "32px");
                chrome.storage.local.set({
                    "active": "true",
                    "link": response
                });
            } else {
                $(".error").show();
                $(".start-gather").hide();
                setTimeout(function () {
                    $(".error").hide();
                    $(".start-gather").show();
                }, 6000);
            }
        });
    });
});

/*----- For ending of a link click on end gathering -----*/

$("#ending").click(function() {
    $(".success").hide();
    $(".start-gather").show();
    $(".foot").css("height", "46px");
    chrome.storage.local.set({
    	"active": "false"
    });
});

/*----- For switching of start gathering and end gathering button we use storage -----*/

chrome.storage.local.get(function (res) {
	console.log(res);
	if (res.active == "true") {
		$(".success").show();
    	$(".start-gather").hide();
        $(".foot").css("height", "32px");
	} else {
		$(".success").hide();
    	$(".start-gather").show();
        $(".foot").css("height", "46px");
	}
    if (res.open == "true") {
        $("#start-chat").hide();
        $(".chat-area").show();
        $(".message-box").show();
        $(".message-box").css("display","flex");
    } else {
        $("#start-chat").show();
        $(".chat-area").hide();
        $(".message-box").hide();
        $(".message-box").css("display","none");
    }
    if (res.link !== undefined) {
        $("#generated").text(res.link);
    }
});

/*----- to copy link to clipboard -----*/

function copyDivToClipboard() {
    var range = document.createRange();
    range.selectNode(document.getElementById("generated"));
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges();// to deselect
}