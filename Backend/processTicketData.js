var getTicketVars = require("./sharedVariables").getTicketVars;

//Vars
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
	var ticketSummarised = []; 

	for(ticket of ticketsData){
		
		var ticketObj = {}
		
		for(dataKey of processTicketVars.dataCollect){

			ticketObj[dataKey] = ticket[dataKey]
		}
		ticketSummarised.push(ticketObj)
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

module.exports = {processData: processData};