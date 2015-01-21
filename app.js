var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var users = {};

app.get("/", function(req, res){
  res.sendFile(__dirname + "/views/index.html");
});

io.on("connection", function(socket){
  console.log("a user connected");

  socket.on("user join", function(new_user){
    users[socket.id] = new_user;
    socket.broadcast.emit("user connect", new_user);
  });

  socket.on("chat message", function(msg){
    var user = users[socket.id];

    console.log("message: " + msg);
    io.emit("chat message", user.name + ": " + msg);
  });

  socket.on("disconnect", function(){
    var user = users[socket.id];

    console.log("user disconnect");
    socket.broadcast.emit("user disconnect", user);
  });
});

http.listen(3000, function(){
  console.log("Listening on :%d", 3000);
});