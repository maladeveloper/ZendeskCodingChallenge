import React from 'react';
import {webFuncInteraction, backendWebVars} from "./backendInterface";
import {NUM_TICKETS} from "../Variables";
import Button from 'react-bootstrap/Button';
import TicketPane from './TicketPane';
import Spinner from 'react-bootstrap/Spinner';

/**
 * High level component which displays the either the loading/ticket/error 
 * pane depending on the sitation. It makes a reuqest to the backend to get 
 * all the tickets per tickets to display at a time (NUM_TICKETS).
 * It keeps API calls to the minimum through the use of caches which 
 * save any tickets that have been requested from the backend previously.
 */
class TicketViewer extends React.Component{

    constructor(props){
        super(props)
        
        this.state = {
            nextTickets:[], 
            prevTickets:[], 
            tickets: false,
            nextLink: false, 
            hasMore:false, 
            success: true,
        }

        this.getNext = this.getNext.bind(this);
        this.getPrev = this.getPrev.bind(this);
        this.setNewTickets = this.setNewTickets.bind(this);
    }

    /**
     * Makes the GET request for the tickets.
     */
    setNewTickets(){
        
        this.setState({tickets:false})
        webFuncInteraction(backendWebVars.GET_TICKS, 
            {
                ticketNums:NUM_TICKETS, 
                afterUrl: (this.state.hasMore ? this.state.nextLink : false)
            }
        ).then((ticketsData) =>{

            if(!ticketsData){

                this.setState({
                    success: false
                })
            }
            else{
                this.setState({
                    ...ticketsData
                })
            }
        })
    

    }

    componentDidMount(){
        this.setNewTickets()

    }

    /**
     * Places the current tickets in "prevTickets" and fills it with the tickets from either 
     * the "nextTickets" cache (if the NUM_TICKET amount of tickets is present) OR
     * makes a request for new tickets from the backend.
     */
    getNext(){

        //Append current tickets to the prevTickets cache and then make request or get from nextTickets cache for next tickets
        this.state.prevTickets.push(...JSON.parse(JSON.stringify(this.state.tickets)));

        if(this.state.nextTickets.length > 0){
            var newTickets;
            var newNextTickets;

            if(this.state.nextTickets.length >= NUM_TICKETS){  

                newTickets = JSON.parse(JSON.stringify(this.state.nextTickets.slice(0, NUM_TICKETS)))
                newNextTickets = JSON.parse(JSON.stringify(this.state.nextTickets.slice(NUM_TICKETS , this.state.nextTickets.length)))
            }
            else{//The last few tickets to get which is less than the number of tickets to display.

                newTickets = JSON.parse(JSON.stringify(this.state.nextTickets));
                newNextTickets = [];
            }

            this.setState({
                tickets: newTickets,
                nextTickets: newNextTickets
            })
        }
        else{//New request must be made since the cache of next tickets is empty.
            this.setNewTickets()
        }
        

    }

    /**
     * Places the current tickets in the "nextTickets" cache, then fills itself with the 
     * next NUM_TICKETS amount from "prevTickets cache".
     */
    getPrev(){
        var ticketsCopy = JSON.parse(JSON.stringify(this.state.tickets))
        var nextTicketsCopy = JSON.parse(JSON.stringify(this.state.nextTickets))

        var newNextTickets = [].concat(ticketsCopy, nextTicketsCopy)
        var newPrevTickets = JSON.parse(JSON.stringify(this.state.prevTickets.slice(0, this.state.prevTickets.length - NUM_TICKETS)))
        var newTickets = JSON.parse(JSON.stringify( this.state.prevTickets.slice(this.state.prevTickets.length - NUM_TICKETS, this.state.prevTickets.length)))

        this.setState({
            nextTickets:newNextTickets, 
            prevTickets: newPrevTickets, 
            tickets: newTickets,
        })
    }   
    

    render(){
        return(
            <div>
                {this.state.success //Only proceed if there is success with API access.
                ?
                <div>
                    {this.state.tickets //Only can show tickets once they have loaded.
                    ?
                    <div>
                        <div>
                            <TicketPane tickets={this.state.tickets}/>
                        </div>
                        <div style={{display:"flex",flexWrap: "wrap",flexDirection:"row"}}>
                            <div className={"navigation-button"}>
                                <Button  style={{margin:"10px"}}  disabled={!(this.state.prevTickets.length >= NUM_TICKETS)} onClick={this.getPrev} variant="outline-primary">Previous</Button>
                            </div>
                            <div className={"navigation-button"}>
                                <Button style={{margin:"10px"}} disabled={!((this.state.nextTickets.length > 0) || this.state.hasMore)} onClick={this.getNext} variant="outline-primary">Next</Button>                      
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <div className="jumbotron jumbotron-fluid" style={{"height":"50vh"}}>
                            <div className="container">
                                <center>
                                <h2>Loading<Spinner animation="grow" /></h2>
                                </center>
                            </div>
                        </div>
                    </div>
                    }
                </div>
                :
                <div>
                    <div className="jumbotron jumbotron-fluid" style={{"height":"50vh", "backgroundColor":"red"}}>
                        <div className="container">
                            <center>
                            <h2>Error</h2>
                            <p>There has been an error accessing the data for the tickets. Please refresh or try again later</p>
                            </center>
                        </div>
                    </div>
                </div>  
                }
            </div>
        )
    }
}

export default TicketViewer;