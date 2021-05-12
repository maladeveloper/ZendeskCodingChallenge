import React from 'react';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card'

class TicketPane extends React.Component{

    constructor(props){
        super(props)
        console.log("Tickets in props- ")
        console.log(this.props.tickets)
        

    }



    render(){

        return(
            <>
  
                <div>

                <Accordion>
                    {
                        this.props.tickets.map((tickData, index) =>{
                            console.log(index)
                            return (
                                <Card>
                                    <Card.Header>
                                        <center>
                                        <Accordion.Toggle as={Button} variant="link" eventKey={tickData.id}>
                                            {tickData.subject}
                                        </Accordion.Toggle>
                                        </center>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey={tickData.id}>
                                        <Card.Body>
                                            {tickData.description}
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