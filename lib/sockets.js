'use strict';
module.exports = class Sockets {
    constructor(port) {
        const WebSocketServer = require('ws').Server;
        this._wss = new WebSocketServer({
            port: port || 8855
        });
        this.clients = [];
        this._wss.on('connection', this._connection);
    }

    broadcast(data) {
        this._wss.clients.forEach(function each(client) {
            client.send(data);
        });
    }

    sendToClient(data, deviceId) {
        this._wss.clients.forEach(function each(client) {
            if (deviceId == client.deviceId) {
                client.send(data);
            }
        });
    }

    _connection(ws) {
        ws.on('message', function incoming(message) {
            console.log('received:', message);
            ws.deviceId = message;
        });
    }
}
