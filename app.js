const express = require('express');
const iolib = require('socket.io');
const session = require('express-session');
const bodyParser = require('body-parser');

const path = require('path');
const PORT = process.env.PORT || 3080;
var pathserv='https://chatroomforstudents.herokuapp.com';
var pathdev= 'http://localhost:' + PORT ;
//const http= require('http');

const app = express();
app.set('view engine','ejs');   // setting template engine as ejs

//middlewares
app.use(express.static(path.join(__dirname, 'public'))).set('views', path.join(__dirname, 'views'));
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//routes
    //route 1
function home(req,res){
	if(!req.session.username) return res.redirect('/login');
	//res.render('chatroomfortwo');
	res.render('chatfortwo3',{
		username : req.session.username
	}
	);
}
		//route 1
function login(req,res){
	//res.render('chatroomfortwo');
	res.render('login');
}

app.get('/',home);
app.get('/login',login);
app.post('/login',(req,res)=>{
	var sess=req.session;
	var post=req.body;
	if(!post.username) return res.redirect('/login');
	sess.username = post.username;
	return res.redirect('/');
});


//listen on port 3080
var server= app.listen(PORT, ()=>{console.log('Listening on '+ PORT );});   //http.Server(app);
//server.listen(3080,()=>{console.log('connected at 3000')});

//make a socket
io=iolib(server);
io.set('origins', pathserv );
io.on('connection', (socket)=>{
	console.log('new user connected/n');
	socket.on('user connection',(msg)=>{console.log(msg);});
	socket.on('message from client',function(msg){
		console.log('msg received');
		console.log(msg);
		socket.broadcast.emit('message from server',msg);
	});
});
