const express = require("express")
var cors = require('cors');
var apiAccess = require("./apiAccess");
var port = require("./sharedVariables").port;


const app = express()
app.use(cors())

/** Path to get the tickets. */
app.get("/tickets", async function (req, res) {
  
  //Put afterUrl as false if user has not passed it in
  var afterUrl = (req.query.afterUrl ? req.query.afterUrl : false)
  var ticketNums = req.query.ticketNums

  //Get the processed ticket data and return it to requester.
  var data = await apiAccess.requestTickets(ticketNums, afterUrl)
  res.json(data);

})

//Start the server listening for requests
var server = app.listen(process.env.PORT || port, 
	() => console.log(`Server is running...http://localhost:${port}`));

  module.exports = server; 