import React from 'react';

/**
 * Returns a nice formatted ticket based on the ticket data 
 * for a single ticket.
 */
class SingleTicket extends React.Component{

    render(){

        return(
            <div>
            
                {Object.entries(this.props.ticket).map(([key,value])=>
                    <div key={key} style={{display:"flex",flexWrap: "wrap"}}>
                        <div style={{flexBasis:"15%"}}>
                            <strong>{key}: </strong>
                        </div>
                        <div style={{flexBasis:"75%"}}>
                            <p>{value}</p>
                        </div>
                    </div>
                )
                }
            </div>
        )
    }
}

export default SingleTicket;