'use strict'
const api = new(require('./lib/api'))();
api.setHeaders().setupRoutes();
api.startServer();

(function pingClients() {
    setTimeout(() => {
        api.webSocketServer.broadcast("ping");
        pingClients();
    }, 360000)
})()
