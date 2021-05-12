import React from 'react';
import {webFuncInteraction, backendWebVars} from "./backendInterface";
import {NUM_TICKETS} from "../Variables";
import Button from 'react-bootstrap/Button';
import TicketPane from './TicketPane';
import Spinner from 'react-bootstrap/Spinner';

class TicketViewer extends React.Component{

    constructor(props){
        super(props)
        
        this.state = {
            nextTickets:[], 
            prevTickets:[], 
            tickets: false,
            nextLink: false, 
            hasMore:false
        }

        this.getNext = this.getNext.bind(this);
        this.getPrev = this.getPrev.bind(this);
        this.setNewTickets = this.setNewTickets.bind(this);
    }

    setNewTickets(){
        this.setState({tickets:false})
        webFuncInteraction(backendWebVars.GET_TICKS, 
            {
                ticketNums:NUM_TICKETS, 
                afterUrl: (this.state.hasMore ? this.state.nextLink : false)
            }
        ).then((ticketsData) =>{
            this.setState({
                ...ticketsData
            })
        })
    

    }

    componentDidMount(){
        this.setNewTickets()

    }

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
        console.log("At Render:")
        console.log(this.state)
        return(
            <>
  
                <div>
                    { this.state.tickets 
                    ?
                    <div>
                        <div><TicketPane tickets={this.state.tickets}/></div>
                        
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
                        <div class="jumbotron jumbotron-fluid" style={{"height":"50vh"}}>
                            <div class="container">
                                <center>
                                <h2>Loading<Spinner animation="grow" /></h2>
                                </center>
                            </div>
                        </div>
                    </div>
                    }
                </div>

            </>
        )
    }



}

export default TicketViewer;