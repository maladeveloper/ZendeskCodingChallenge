var expect    = require("chai").expect;
var request = require("request");

var processData = require("../processTicketData").processData;
var port = require("../sharedVariables").port;
var ticketKey = require("../sharedVariables").ticketKey;
var OKAY_STATUS = require("../sharedVariables").OKAY_STATUS;

////Vars 
//Static Testing vars
var rawTicketData = require("./RawTicket.json")
var processedTicketData = require("./ProcessedTicket.json")
//Server request vars
var numTickets = 2; 
var serverTestUrl = "http://localhost:" + port + "/tickets?ticketNums=" + numTickets;
////

//Unit testing static data.
describe("Ticket Data Processing.", () =>{

    describe("Processing Entire Ticket Data.", () =>{

        it("Processes raw ticket data successfully.", ()=>{

            var testProcessed = processData(rawTicketData)
            expect(testProcessed).to.deep.equal(processedTicketData);
        })
    })
})

//Testing API server calls.

try{
    //First make sure the backend server is running.
    request(serverTestUrl, (error, response, body) =>{
                
        if(response === undefined){
    
            throw "BACKEND SERVER IS NOT RUNNING THUS TEST SUITE CANNOT BE EXECUTED."
        }
    })
}catch(e){

    console.log(e)
}

describe("Testing API server Calls.WARNING: BACKEND SERVER MUST BE RUNNING.", ()=>{

    describe("Testing Server Call for Ticket Data.", ()=>{

        it("Returns the correct status (200)", ()=>{

            request(serverTestUrl, (error, response, body) =>{
                
                expect(response.statusCode).to.equal(OKAY_STATUS)
            })
        })
        it("Returns the correct number of tickets (ticket data may vary, but number of tickets is defined and thus can be tested).", ()=>{
        
            request(serverTestUrl, (error, response, body) =>{
                var parsedBody  = JSON.parse(body)
                expect(parsedBody[ticketKey].length).to.equal(numTickets)
            })
        })
    })
})

