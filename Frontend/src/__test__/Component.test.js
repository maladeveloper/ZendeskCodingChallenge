import React from 'react';
import { shallow, configure } from 'enzyme';
import '@testing-library/jest-dom';
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

//Import relevent components
import HomePage from "../Scripts/HomePage";
import TicketViewer from "../Scripts/TicketViewer";
import TicketPane from '../Scripts/TicketPane';
import SingleTicket from '../Scripts/SingleTicket';

//Vars 
var  mockedTicketData = require("./MockedTicketData.json")



describe("Testing if independant components render without crashing", () =>{

  it("HomePage renders without crashing.", () => {
    shallow(<HomePage />);
  });

  it("TicketViewer rendeders without crashing.", ()=>{
    shallow(<TicketViewer/>)
  })

})

describe("Testing if components with props input render without crashing.", () =>{
  it("TicketPane renders without crashing", () =>{

    shallow(<TicketPane tickets={mockedTicketData.tickets}/>)
  })

  it("SingleTicket renders without crashing.", ()=>{

    shallow(<SingleTicket ticket={mockedTicketData.tickets[0]}/>)
  })
  
})
