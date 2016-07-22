'use strict';
module.exports = class Api{
  constructor(){
    const express = require('express');
    const Sockets = require('./sockets');
    const app = express();
    this.app = app;
    this.webSocketServer = new Sockets();
  }

  setHeaders(){
    this.app.use(function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });
    return this;
  }

  startServer(){
    this.app.listen(3005, function() {
        console.log('Started API & WebSocketServer');
    });
    return this;
  }

  setupRoutes(){
    this.app.get('/api/raw/command/:num', function(req, res) {
        if (req.headers.authorization) {
            this.webSocketServer.sendToClient(req.params.num, req.headers.authorization);
            res.send('Ok');
        }
    });

    this.app.get('/api/ping', function(req, res) {
        this.webSocketServer.broadcast("ping");
        res.send('Ok');
    });
    return this;
  }
}
