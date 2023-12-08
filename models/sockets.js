const io = require("socket.io")

class Sockets {
  constructor(io) {
    this.io = io
    this.socketEvents()
  }

  socketEvents() {
    this.io.on("connection", (socket) => {
      // listen the event
      socket.on("message-to-server", (data) => {
        console.log(data)
        // emit the event
        this.io.emit("message-from-server", data)
      })
    })
  }
}

module.exports = Sockets
