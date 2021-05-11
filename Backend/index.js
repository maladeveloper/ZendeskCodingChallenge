const express = require("express")
const app = express()
const { url } = require("inspector");
//Vars 
const port = 3000; 
var apiAccess = require("./apiAccess");

// define the first route
app.get("/tickets", async function (req, res) {
  
  var data = await apiAccess.getTickets(20)
  res.json(data);
  //res.send("<p>Hello</p>") 

})

// start the server listening for requests
app.listen(process.env.PORT || port, 
	() => console.log(`Server is running...http://localhost:${port}`));