const express = require('express');
const iolib = require('socket.io');
//const http= require('http');

const app = express();
app.set('view engine','ejs');   // setting template engine as ejs

//middlewares
app.use(express.static('public'));

//routes
    //route 1
function home(req,res){
	res.render('index');
}
app.get('/',home);


//listen on port 3000
server= app.listen(3000);   //http.Server(app);
//server.listen(3000,()=>{console.log('connected at 3000')});

//make a socket
io=iolib(server);
io.on('connection', (socket)=>{
	//console.log('new user connected/n');
	socket.on('message from client',function(msg){
		//console.log('msg received');
		//console.log(msg);
		io.emit('message from server',msg);
	});
});

