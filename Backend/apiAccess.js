var http = require('https');
const fetch = require("node-fetch");
//Vars
const BASE_URL = "https://malavansrikumar.zendesk.com"
const OKAY_STATUS = 200;
const email = "srikumar.malavan@gmail.com"; 
const token = "OzRDPQ5fhG9NGpxDywBvyIdz0dR71Stx48dmLSrs";
const getTicketVars = {
	path: "/api/v2/tickets.json?",
	pageNums : "page[size]=",
	pageAfter:"page[after]=",
	joiner: "&"

}
const processDataVars = {
	"tickets":	(data) =>processTickets( followJsonDict(data, ["tickets"])), //Has the path in json to the relavant data
	"nextLink":(data) => getNextLink(followJsonDict(data, ["links","next"])),
	"hasMore": (data) => followJsonDict(data, ["meta", "has_more"])
}

const processTicketVars = {
	id: "id",
	dataCollect: ["id", "subject", "description", "created_at", "updated_at", "type", "priority", "status"]
}
//

function followJsonDict(jsonData, pathArray){
	var path = Array.from(pathArray)
	var data = jsonData; 

	while(path.length > 0){
		
		data = data[path[0]]

		path.shift()
	}

	return data;
}

function getNextLink(urlData){

	var decodedUrl = decodeURI(urlData)

	return decodedUrl.split(getTicketVars.pageAfter).pop().split(getTicketVars.joiner)[0]
}

function processTickets(ticketsData){
	var ticketSummarised = {}; 

	for(ticket of ticketsData){
		
		ticketSummarised[ticket[processTicketVars.id]] = {};
		
		for(dataKey of processTicketVars.dataCollect){

			ticketSummarised[ticket[processTicketVars.id]][dataKey] = ticket[dataKey]
		}
	}
	return ticketSummarised

	
}


function processData(data){
	var processedData = {}

	for(var key in processDataVars){
		processedData[key] = processDataVars[key](data)
		//if(key=="nextLink"){ console.log(processedData[key])}
	}

	return processedData;



}

async function getTickets(ticketNums, afterUrl){
	var path; 

	path = getTicketVars.path + getTicketVars.pageNums + ticketNums;

	if(afterUrl){
		path += getTicketVars.joiner + getTicketVars.pageAfter + afterUrl
	}

	console.log(path)


	var data = await makeRequest(path);
	var processedData = processData(data);
	return processedData
}

function makeRequest(path){

	return new Promise((resolve, reject) =>{

		var request = http.request(
			"https://malavansrikumar.zendesk.com", 
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


module.exports = {getTickets: getTickets};