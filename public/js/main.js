(function() {
	const socket = io(); // a constant is a variable that should never change (remains constant)
	//const nName = "julio";

	let messageList = document.querySelector('ul'),
			chatForm 	= document.querySelector('form'),
			nameInput	= document.querySelector('.nickname'),
			nickName 	= null,
			chatMessage = chatForm.querySelector('.message');

	function setNickname() {
		nickName = this.value;
	}

	function handleSendMessage(e) {
		e.preventDefault(); // kill form submit
		nickName = (nickName && nickName.length > 0) ? nickName : 'user';
		msg = `${nickName} says ${chatMessage.value}`;

		socket.emit('chat message', msg);
		chatMessage.value = '';
		return false;
	}

	function appendMessage(msg) {
		// will it get passed thru?
		// debugger;
		let randomColor = getRandomColor();
		let newMsg = `<li class="new" style="color:${randomColor};">${msg.message}</li>`;
		messageList.innerHTML += newMsg;
		afterAnimation(messageList);
	}

	function appendDMessage(msg) {
		let randomColor = getRandomColor();
		let newMsg = `<li class="new" style="color:${randomColor};">${msg}</li>`
		messageList.innerHTML += newMsg;
		afterAnimation(messageList);
	}

	// generate random color for user's message
	function getRandomColor() {
		var letters = '0123456789ABCDEF';
		var color = '#';
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

	// function to remove the new class from messages, so each new message only gets animated once
	function afterAnimation(messageList){
		setTimeout(function() {
			messageList.querySelector('.new').classList.remove("new");
		}, 1000);
	}

	nameInput.addEventListener('change', setNickname, false);
	chatForm.addEventListener('submit', handleSendMessage, false);
	socket.addEventListener('chat message', appendMessage, false);
	socket.addEventListener('disconnect message', appendDMessage, false);
})();
