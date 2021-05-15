var getTicketVars = require("./sharedVariables").getTicketVars;
var processData = require("./processTicketData").processData;
var successKey = require("./sharedVariables").successKey;
var OKAY_STATUS = require("./sharedVariables").OKAY_STATUS;


var http = require('https');
//Vars
const BASE_URL = "https://malavansrikumar.zendesk.com"
const email = "srikumar.malavan@gmail.com"; 
const token = "OzRDPQ5fhG9NGpxDywBvyIdz0dR71Stx48dmLSrs";

/**
 * Requests the tickets from the Zendesk API and then calls function to process and returns the data.
 * @param {Number} ticketNums: Number of tickets to return per request.
 * @param {String} afterUrl  : URL to follow to next page after a specific page of tickets.
 * @returns - Processed ticket data requested from the Zendesk API.
 */
async function requestTickets(ticketNums, afterUrl){
	var path; 

	path = getTicketVars.path + getTicketVars.pageNums + ticketNums;

	if(afterUrl){//Add the URL for the next page URL if it is present.
		path += getTicketVars.joiner + getTicketVars.pageAfter + afterUrl
	}

	var data = await makeRequest(path);

	//If there has been an error with the api and data is not received
	if (!data){
		return {[successKey]:false}
	}
	 
	return processData(data);
}


/**
 * Makes a GET request based on the path of the URL given.
 * @param {String} path: Path of the URL to get the data from.
 * @returns  - A promise which once resolved has the relavant data.
 */
function makeRequest(path){

	return new Promise((resolve, reject) =>{

		var request = http.request(
			BASE_URL, 
			{
				'path': path,
				'auth': email + "/token:" + token
			}, 
			(response) => {
				//Set as false if correct code is not given
				if (response.statusCode !== OKAY_STATUS){
					resolve(false)
				}

				var chunks = []
				response.setEncoding('utf8');

				//Read data in by chunks and then add it to the chunks data array.
				response.on('data', (chunk) =>{
					chunks.push(chunk)
				})
				response.on("end", ()=>{

					resolve(JSON.parse(chunks.join("")));
				})
				response.on("error", ()=>{

					resolve(false)
				})

			}
		)
		request.end()
	})
}


module.exports = {requestTickets: requestTickets};