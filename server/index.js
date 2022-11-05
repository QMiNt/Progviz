var express = require('express');
const app = express()
var path = require('path')
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const staticPath = path.join(__dirname,"./public")
console.log(staticPath);
app.use(express.static(staticPath));
app.get('/view', (req, res) => {
    res.sendFile(__dirname + '/public/streamview.html');
})
app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/public/home.html');
})
app.get('/startst', (req, res) => {
    res.sendFile(__dirname + '/public/regform.html');
})
app.get('/dashboard', (req, res) => {
    res.sendFile(__dirname + '/public/Dashboard.html');
})
app.get('/started', (req, res) => {
    res.sendFile(__dirname + '/public/started.html');
})
io.on('connection', (socket)=> {

    socket.on("join-message", (roomId) => {
        socket.join(roomId);
        console.log("User joined in a room : " + roomId);
    })

    socket.on("screen-data", function(data) {
        data = JSON.parse(data);
        var room = data.room;
        var imgStr = data.image;
        socket.broadcast.to(room).emit('screen-data', imgStr);
    })
})

var server_port = process.env.YOUR_PORT || process.env.PORT || 5000;
http.listen(server_port, () => {
    console.log("Started on : "+ server_port);
})