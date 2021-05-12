import React from 'react';
import Button from 'react-bootstrap/Button';


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
                {
                    this.props.tickets.map((tickData, index) =>{
                        return (<p>{tickData.subject}</p>)
                    })
                }
                </div>

            </>
        )
    }



}

export default TicketPane;