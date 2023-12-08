const express = require("express")
const http = require("http")
const cors = require("cors")
const socketio = require("socket.io")
const path = require("path")

const Sockets = require("./sockets")

class Server {
  constructor() {
    // Express server
    this.app = express()
    this.port = process.env.PORT
    this.app.use(cors())

    // HTTP server

    this.server = http.createServer(this.app)

    // Socket server configuration
    this.io = socketio(this.server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    })
  }

  socketConfiguration() {
    new Sockets(this.io)
  } // Method to configure the socket server and its events

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, "../public")))
  }

  execute() {
    // init sockets
    this.socketConfiguration()
    // init middlewares
    this.middlewares()
    // init server
    this.server.listen(this.port, () =>
      console.log(`Server running on port ${this.port}`)
    )
  }
}

module.exports = Server
