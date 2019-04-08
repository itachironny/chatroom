$(function(){
	var d = new Date();
	//create a socket
	var socket = io('https://chatroomforstudents.herokuapp.com');
	//connection event handler : message coming in
	socket.on('message from server', function (msg) {
		// body...
		var list= $('<li>');
		list.append($('<div>').append($('<h1>').text(msg['username'])).css({
													'color': msg['color'], 
													'font-size':'0.4em'
												}));
		list.append($('<div>').text(msg['message']));
		list.append($('<div>').append($('<p>').text(d.toLocaleTimeString())).css({
															'font-size':'0.7em',
															'text-align':'right',
															'color':'green'
														}));
		$('#messages').append(list);
	});
	// message going out
	$('form').submit(function(event){
		event.preventDefault();
		var msg= {
			'message': $('form #msg_div #m').val(),
			'username': $('form #user #username').val(),
			'color': $('form #user #color').val()
		};
		socket.emit('message from client',msg);
		$('form #m').val('');
		return false;
	});
});
