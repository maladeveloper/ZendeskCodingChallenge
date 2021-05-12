import React from 'react';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import SingleTicket from "./SingleTicket";

class TicketPane extends React.Component{

    constructor(props){
        super(props)
        console.log("Tickets in props- ")
        console.log(this.props.tickets)
        

    }



    render(){

        return(
            <>
  
                <div style={{height:"425px", overflow:"auto"}}>

                <Accordion>
                    {
                        this.props.tickets.map((tickData, index) =>{
                            console.log(index)
                            return (
                                <Card>
                                    <Card.Header>
                                        <center>
                                        <Accordion.Toggle as={Button} variant="link" eventKey={tickData.Id}>
                                            {tickData.Subject}
                                        </Accordion.Toggle>
                                        </center>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey={tickData.Id}>
                                        <Card.Body>
                                            
                                            <SingleTicket ticket={tickData}/>
                                            
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                
                            )
                        })
                    }
                </Accordion>
                </div>

            </>
        )
    }



}

export default TicketPane;