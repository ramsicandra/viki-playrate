const video = document.getElementsByTagName('video')[0];

let noSubPlayrate = 3;
let subPlayrate = 1;

function isSubtitle() {
	return document.querySelector('.vjs-text-track-display div').children.length == 1;
}

function getSubtitle() {
	if (!isSubtitle()) return "";
	return document.querySelector('.vjs-text-track-display div div div').innerText;
}

function isSongSubtitle() {
	return getSubtitle().includes('♫') || getSubtitle().includes('♬');
}

function setPlayrate(rate) {
	video.playbackRate = rate;
}

function heartbeat() {
	if(!isSubtitle() || isSongSubtitle()) {
		setPlayrate(noSubPlayrate);
	} else {
		setPlayrate(subPlayrate);
	}
}

window.onload = function() {
	setInterval(heartbeat);
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	noSubPlayrate = request.noSubPlayrate;
	subPlayrate = request.subPlayrate;
});
