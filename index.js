"use strict"

process.title="IOTwebhook";

const express = require('express');
const GetwebhookHandler = require('github-webhook-handler');
var webhookHandler = GetwebhookHandler({ path: '/webhook', secret: 'secret' });

let server = express();
//app.use(bodyParser.json()); // must use bodyParser in express
server.use(webhookHandler); // use our middleware

webhookHandler.on('push', function (repo, data) {
   console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref)
});
webhookHandler.on('error', function (err) {
  console.error('Error:', err.message)
})

server.get("/", (req, res) =>
{
   res.status(200).send("Hello");
});

/* handle SIGTERM and SIGINT (ctrl-c) nicely */
process.once('SIGTERM', end);
process.once('SIGINT', end);

//app.listen(3000, () => {
//   console.log("I'm listening.")
//});
var listener = server.listen(8000, function(err) {
    if (err) throw err;

    var host = listener.address().address;
    var port = listener.address().port;

    console.log('Server listening at http://%s:%s', host, port);
});


var lastSocketKey = 0;
var socketMap = {};
listener.on('connection', function(socket) {
    /* generate a new, unique socket-key */
    var socketKey = ++lastSocketKey;
    /* add socket when it is connected */
    socketMap[socketKey] = socket;
    socket.on('close', function() {
        /* remove socket when it is closed */
        delete socketMap[socketKey];
    });
});

function end() {
    /* loop through all sockets and destroy them */
    Object.keys(socketMap).forEach(function(socketKey){
        socketMap[socketKey].destroy();
    });

    /* after all the sockets are destroyed, we may close the server! */
    listener.close(function(err){
        if(err) throw err();

        console.log('Server stopped');
        /* exit gracefully */
        process.exit(0);
    });
}
