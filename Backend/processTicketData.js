var getTicketVars = require("./sharedVariables").getTicketVars;
var successKey = require("./sharedVariables").successKey;

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
		//console.log(ticketObj)
		ticketSummarised.push(ticketObj)
	}
	return ticketSummarised

	
}

/*
Checks if all values in the object that is being passed to the front end 
has a value that is not undefined or null (even though JSON parsing removes 
undefined values, there is still data that is missing and thus needs to fail 
FAST)
*/
function allKeysHaveVal(obj){
	var truthArr = [];
	function recurseSearch(obj, truthArr){
		Object.keys(obj).forEach(key =>{
			const val = obj[key];
			if(typeof(val) === 'object' && val !== null){

				recurseSearch(val, truthArr)	
			}
			else{
				if(val == undefined || val==null){
					truthArr.push(false)
					return
				}
			}
		})
	}
	recurseSearch(obj, truthArr)
	if (truthArr.length > 0){
		return false
	}
	return true
}


function processData(data){
	var processedData = {}

	for(var key in processDataVars){
		processedData[key] = processDataVars[key](data)
	}
	
	processedData[successKey] = false
	
	//Check if all the keys have values which are not undefined or null and give success key based on that.
	if(allKeysHaveVal(processedData)){
		
		processedData[successKey] = true
	}
	

	return processedData;
}

module.exports = {processData: processData};
