var getTicketVars = require("./sharedVariables").getTicketVars;

//Vars
const processDataVars = {
	"tickets":	(data) =>processTickets( followJsonDict(data, ["tickets"])), //Has the path in json to the relavant data
	"nextLink":(data) => getNextLink(followJsonDict(data, ["links","next"])),
	"hasMore": (data) => followJsonDict(data, ["meta", "has_more"])
}

const processTicketVars = {
	id: "id",
	dataCollect: {
        "id": (data) =>  data.toString() , //functions the specific data needs to be passed to to make it clean and of the specific type 
        "subject": (data) => data, 
        "description":(data) => data,
        "created_at": (data) => Date(data).toLocaleString().split("GMT")[0],
        "updated_at":(data) => Date(data).toLocaleString().split("GMT")[0],
        "type": (data) => (data ? data : "Is of no type."), 
        "priority":(data) => (data ? data : "Has no priority."), 
        "status":(data) => data,
    },
    keyJoiner:"_" 
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

function prettifyKey(keyString){
    keyString = keyString.replace(processTicketVars.keyJoiner, " ");

    return keyString.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
}


function processTickets(ticketsData){
	var ticketSummarised = []; 

	for(ticket of ticketsData){
		
		var ticketObj = {}
		
		for(var [dataKey,cleanFunc] of Object.entries(processTicketVars.dataCollect)){

			ticketObj[prettifyKey(dataKey)] = cleanFunc(ticket[dataKey])
		}
		ticketSummarised.push(ticketObj)
	}
	return ticketSummarised

	
}

function processData(data){
	var processedData = {}

	for(var key in processDataVars){
		processedData[key] = processDataVars[key](data)
	}

	return processedData;
}

module.exports = {processData: processData};