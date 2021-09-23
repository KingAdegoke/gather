/*----- For Closing Popup -----*/

$(".close").click(function() {
    window.close();
});

/*----- copy generated link to clipboard -----*/

$(".copy").click(function() {
    copyDivToClipboard();
    $(this).css("color","#17a2b8");
});

/*----- For Link which generates when click on start gathering -----*/

$("#gather").click(function() {
    $(".success").show();
    $(".start-gather").hide();
    chrome.storage.local.set({
    	"active": "true"
    });
});

/*----- For ending of a link click on end gathering -----*/

$("#ending").click(function() {
    $(".success").hide();
    $(".start-gather").show();
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
	} else {
		$(".success").hide();
    	$(".start-gather").show();
	}
});

function copyDivToClipboard() {
    var range = document.createRange();
    range.selectNode(document.getElementById("generated"));
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges();// to deselect
}