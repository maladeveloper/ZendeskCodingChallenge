import React from 'react';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import SingleTicket from "./SingleTicket";

/**
 * The ticket pane which shows a list of all the tickets.
 */
class TicketPane extends React.Component{

    render(){

        return(
                <div style={{height:"425px", overflow:"auto"}}>
                    <Accordion>
                        {
                            this.props.tickets.map((tickData, index) =>{
                                return (
                                    <Card key={tickData.Id}>
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
        )
    }
}

export default TicketPane;