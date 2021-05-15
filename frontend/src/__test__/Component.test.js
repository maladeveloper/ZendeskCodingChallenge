import React from 'react';
import { shallow, configure } from 'enzyme';
import '@testing-library/jest-dom';
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

//Import relevent components
import HomePage from "../Scripts/HomePage";
import TicketViewer from "../Scripts/TicketViewer";
import TicketPane from '../Scripts/TicketPane';


describe("Testing if non-dependant components render without crashing", () =>{

  it("HomePage renders without crashing", () => {
    shallow(<HomePage />);
  });

  it("TicketViewer rendeders without crashing", ()=>{
    shallow(<TicketViewer/>)
  })

})
