import React from 'react';
import TicketViewer from './TicketViewer';
import Navbar from 'react-bootstrap/Navbar';

class HomePage extends React.Component{

    render(){

        return(
            <div style={{display:"flex", flexDirection:"column",}}>
                <Navbar bg="dark" variant="dark">
                        <Navbar.Brand href="#home">
                            <i>Malavan Zendesk Challenge</i> 
                        </Navbar.Brand>
                    </Navbar>
                    <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4">Zendesk Ticket Viewer</h1>
                        <p className="lead">Made by Malavan Srikumar</p>
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