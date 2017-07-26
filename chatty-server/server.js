// server.js
const uuidv4 = require('uuid/v4');

const express = require('express');
// const SocketServer = require('ws').Server;
const WebSocket = require('ws');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new WebSocket.Server({ server });


wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    let receivedMessage = JSON.parse(message);

    if (receivedMessage.type === "postMessage"){
      receivedMessage["id"] = uuidv4();
      receivedMessage.type = "incomingMessage"

      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(receivedMessage));
        }
      });
    }else if (receivedMessage.type === "postNotification"){
      receivedMessage.type = "incomingNotification"
      receivedMessage.content = `${receivedMessage.oldName} changed their username to ${receivedMessage.newName}`
      wss.clients.forEach(function each(client){
        if (client.readyState === WebSocket.OPEN){
          client.send(JSON.stringify(receivedMessage));
        }
      })
    }


  });



});

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});