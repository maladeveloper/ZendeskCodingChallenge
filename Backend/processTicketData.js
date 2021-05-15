var getTicketVars = require("./sharedVariables").getTicketVars;
var successKey = require("./sharedVariables").successKey;
var ticketKey = require("./sharedVariables").ticketKey;


////Vars
//The variables that has the keys for the keys of a raw data.
const processDataVars = {
	[ticketKey]:	(data) =>processTickets( followJsonDict(data, ["tickets"])), //Has the path in json to the relavant data
	"nextLink":(data) => getNextLink(followJsonDict(data, ["links","next"])),
	"hasMore": (data) => followJsonDict(data, ["meta", "has_more"])
}
//The variables that has the keys for the keys of a raw ticket.
const processTicketVars = {
	id: "id",
	dataCollect: {
        "id": (data) =>  data.toString() , //functions the specific data needs to be passed to to make it clean and of the specific type 
        "subject": (data) => data, 
        "description":(data) => data,
        "updated_at":(data) => new Date(data).toUTCString(),
        "type": (data) => (data ? data : "Is of no type."), 
        "priority":(data) => (data ? data : "Has no priority."), 
        "status":(data) => data,
    },
    keyJoiner:"_" 
}
////

/**
 * Follow the path specified by array to the object to find the data at its 
 * end. 
 * e.g pathArray=["Hello", "World"], jsonData={"Hello":{"World": 5}} would return 5.
 * @param {Object} jsonData 		: The Object to traverse.
 * @param {Array<String>} pathArray : The path to follow to find data.
 * @returns 
 */
function followJsonDict(jsonData, pathArray){
	var path = Array.from(pathArray)
	var data = jsonData; 

	while(path.length > 0){
		
		data = data[path[0]]

		path.shift()
	}

	return data;
}

/**
 * Get the link data (specific string) from the "nextLink" data from the
 * URL string that is originally in the raw data.
 * e.g https://malavansrikumar.zendesk.com/api/v2/tickets.json?page%5Bafter%5D=eyJvIjoibmljZV9pZCIsInYiOiJhUUlBQUFBQUFBQUEifQ%3D%3D&page%5Bsize%5D=2 -> eyJvIjoibmljZV9pZCIsInYiOiJhUUlBQUFBQUFBQUEifQ%3D%3D
 * @param {*} urlData 
 * @returns 
 */
function getNextLink(urlData){

	var decodedUrl = decodeURI(urlData)

	return decodedUrl.split(getTicketVars.pageAfter).pop().split(getTicketVars.joiner)[0]
}

/**
 * Makes the keys from the raw data into a user friendly format.
 * Does this by removing all the underscores and capitalising the words.
 * @param {String} keyString - Raw key data. 
 * @returns  - Pretty formatted key.
 */
function prettifyKey(keyString){
    keyString = keyString.replace(processTicketVars.keyJoiner, " ");

    return keyString.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
}

/**
 * Processes the array of raw tickets.
 * @param {Array<Object>} ticketsData : Array of raw Tickets. 
 * @returns  - Array of processed tickets.
 */
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


/**
 * Checks if all values in the object that is being passed to the front end 
 *has a value that is not undefined or null (even though JSON parsing removes 
 *undefined values, there is still data that is missing and thus needs to fail 
 *FAST)
 * @param {Object} obj: The object with the relavant data to check.
 * @returns - True/False whether object has data for all the keys.
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


/**
 * Process all the data returned by the API.
 * @param {Object} data : Unprocessed raw data from the zendesk API.
 * @returns  - Processed data object.
 */
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
