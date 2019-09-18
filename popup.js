const noSubInput = document.getElementById('noSubPlayrate');
const noSubOutput = document.getElementById('noSubPlayrateDisplay');

const subInput = document.getElementById('subPlayrate');
const subOutput = document.getElementById('subPlayrateDisplay');

noSubInput.oninput = function() {
	noSubOutput.innerHTML = noSubInput.value;
	broadcastPlayrate();
}

subInput.oninput = function() {
	subOutput.innerHTML = subInput.value;
	broadcastPlayrate();
}

function broadcastPlayrate() {
	sendToAllTabs(getPlayrateMessage());
}

function getPlayrateMessage() {
	return {
		noSubPlayrate: parseFloat(noSubInput.value),
		subPlayrate: parseFloat(subInput.value)
	};
}

function sendToAllTabs(message) {
	chrome.tabs.query({}, function(tabs) {
		tabs.forEach(function(tab) {
			chrome.tabs.sendMessage(tab.id, message);			
		});
	});
}