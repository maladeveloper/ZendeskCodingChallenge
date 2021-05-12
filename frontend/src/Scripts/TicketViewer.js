import React from 'react';
import {webFuncInteraction, backendWebVars} from "./backendInterface";
import {NUM_TICKETS} from "../Variables";
import Button from 'react-bootstrap/Button';


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
        console.log("Setting new tickets...")
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
                {//Only can get next tickets if tickets in nextTickets cache or has next link
                ((this.state.nextTickets.length > 0) || this.state.hasMore) 
                    &&
                    <Button onClick={this.getNext} variant="outline-primary">Next</Button>
                }
                {//Only can get previous tickets if tickets in prevTickets cache
                this.state.prevTickets.length >= NUM_TICKETS
                    &&
                    <Button onClick={this.getPrev} variant="outline-primary">Previous</Button>


                }    
                
                </div>

            </>
        )
    }



}

export default TicketViewer;