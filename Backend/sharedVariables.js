const port = 3001;
const OKAY_STATUS = 200;


const successKey = "success";
const ticketKey = "tickets"


const getTicketVars = {
	path: "/api/v2/tickets.json?",
	pageNums : "page[size]=",
	pageAfter:"page[after]=",
	joiner: "&"

}


module.exports = {getTicketVars: getTicketVars, successKey:successKey, port:port, OKAY_STATUS:OKAY_STATUS, ticketKey:ticketKey};