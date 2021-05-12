import React from 'react';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';


class SingleTicket extends React.Component{

    constructor(props){
        super(props)
        console.log(this.props.ticket)
        

    }



    render(){

        return(
            <>
  
                <div>
                
                    {Object.entries(this.props.ticket).map(([key,value])=>
                        <div style={{display:"flex",flexWrap: "wrap"}}>
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

            </>
        )
    }



}

export default SingleTicket;