import React from 'react';
import TicketViewer from './TicketViewer';
import Navbar from 'react-bootstrap/Navbar';

class HomePage extends React.Component{

    constructor(props){super(props)}



    render(){

        return(
            <div style={{display:"flex", flexDirection:"column",}}>
                <Navbar bg="dark" variant="dark">
                        <Navbar.Brand href="#home">
                            <i>Malavan Zendesk Challenge</i> 
                        </Navbar.Brand>
                    </Navbar>
                    <div class="jumbotron jumbotron-fluid">
                    <div class="container">
                        <h1 class="display-4">Zendesk Ticket Viewer</h1>
                        <p class="lead"><bold>Made by Malavan Srikumar</bold></p>
                    </div>
                    </div>
                <div className={"page-item"}>
                    <div style={{display:"flex"}}>
                        <h3>Tickets</h3>
                    </div>
                </div>
                <div className={"page-item"}>
                    <div style={{flexBasis:"90%"}}>
                        <TicketViewer/>
                    </div>
                </div>
            </div>

        
        )
    }
}
export default HomePage;