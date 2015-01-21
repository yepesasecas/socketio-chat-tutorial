var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", function(req, res){
  res.sendFile(__dirname + "/views/index.html");
});

io.on("connection", function(socket){
  console.log("a user connected");
  socket.broadcast.emit("user connect", "user_name");

  socket.on("chat message", function(msg){
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });

  socket.on("disconnect", function(){
    console.log("user disconnect");
    socket.broadcast.emit("user disconnect", "user_name");
  });
});

http.listen(3000, function(){
  console.log("Listening on :%d", 3000);
})