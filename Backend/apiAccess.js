var getTicketVars = require("./sharedVariables").getTicketVars;
var processData = require("./processTicketData").processData;

var http = require('https');
//Vars
const BASE_URL = "https://malavansrikumar.zendesk.com"
const OKAY_STATUS = 200;
const email = "srikumar.malavan@gmail.com"; 
const token = "OzRDPQ5fhG9NGpxDywBvyIdz0dR71Stx48dmLSrs";



async function requestTickets(ticketNums, afterUrl){
	var path; 

	path = getTicketVars.path + getTicketVars.pageNums + ticketNums;

	if(afterUrl){
		path += getTicketVars.joiner + getTicketVars.pageAfter + afterUrl
	}

	var data = await makeRequest(path);
	var processedData = processData(data);
	return processedData
}

function makeRequest(path){

	return new Promise((resolve, reject) =>{

		var request = http.request(
			BASE_URL, 
			{
				'path': path,
				'auth': email + "/token:" + token
			}, 
			(response) => {
				var chunks = []
				response.setEncoding('utf8');

				response.on('data', (chunk) =>{
					chunks.push(chunk)
				})
				response.on("end", ()=>{

					resolve(JSON.parse(chunks.join("")));
				})

			}
		)
		request.end()
	})
}


module.exports = {requestTickets: requestTickets};