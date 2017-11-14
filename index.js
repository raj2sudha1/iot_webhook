"use strict"

const express = require('express');
const GetwebhookHandler = require('github-webhook-handler');
var webhookHandler = GetwebhookHandler({ path: '/webhook', secret: 'secret' });

let app = express();
//app.use(bodyParser.json()); // must use bodyParser in express
app.use(webhookHandler); // use our middleware

webhookHandler.on('push', function (repo, data) {
   console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref)
});
webhookHandler.on('error', function (err) {
  console.error('Error:', err.message)
})
app.get("/", (req, res) =>
{
   res.status(200).send("Hello");
});

app.listen(3000, () => {
   console.log("I'm listening.")
});
