$(function(){
	var colors = ['red', 'green', 'navy', 'orange', 'grey','black'];
	var names = ['itachi', 'iroh', 'gryffindor', 'albus', 'snape', 'luffy'];

	color=colors[Math.floor(Math.random() * colors.length)];
	name=names[Math.floor(Math.random() * names.length)];
	var d = new Date();
	//create a socket
	var socket = io('http://localhost:3000');
	//connection event handler : message coming in
	var rec_str="<h1>Tim</h1><> • 51 min</time></div></div></div>" ;
	socket.on('message from server', function (msg) {
		// body...
		// var list= $('<li>');
		// list.append($('<div>').append($('<h1>').text(msg['username'])).css({
		// 											'color': msg['color'], 
		// 											'font-size':'0.4em'
		// 										}));
		// list.append($('<div>').text(msg['message']));
		// list.append($('<div>').append($('<p>').text(d.toLocaleTimeString())).css({
		// 													'font-size':'0.7em',
		// 													'text-align':'right',
		// 													'color':'green'
		// 												}));
		// $('#messages').append(list);

		var msg_div = $("<div class='row msg_container base_receive'>");
		msg_div.append($("<div class='col-md-2 col-xs-2 avatar'>").append($("<img src='http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg' class='img-responsive'>")));
		var msg_div1=$("<div class='col-md-10 col-xs-10'>");
		var msg_div11=$("<div class='messages msg_receive'>")
		msg_div11.append($("<p>").text(msg['message']));
		//msg_div11.append($("<h1>").text(msg['username']));
		// .css({
		// 								'color':msg['color'],
		// 								'text-align':'left'
		// 									}
		// 							)
		msg_div11.append($("<time datetime='2009-11-13T20:00'>").text(
					msg['username']+' • '+d.toLocaleTimeString()).css({
		    							'color':msg['color']
									}));

		msg_div.append(msg_div1.append(msg_div11));



		// msg_div.find('p').text(msg['message']);
		// msg_div.find('h1').text(msg['username']);
		// msg_div.find('h1').css('color',msg['color']);
		var objDiv = $('.panel-body');
		objDiv.append(msg_div);
		objDiv.scrollTop = objDiv.scrollHeight;
	});
	// message going out
	document.getElementById('btn-chat').onclick= function btnchatclick(){
		// event.preventDefault();
		//alert("handler");
		socket.emit('user connection','connected');
		var msg= {
			'message': $('.form-control').val(),
			'username': name,
			'color': color
		};
		socket.emit('message from client',msg);
		$('.form-control').val('');
	};
});
