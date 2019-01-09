import React, { Component } from 'react';
import logo from './logo.svg';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './App.css';
import MapContainer from './MapContainer';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

  var google = window.google;

class App extends Component {
  constructor(props){
    super(props);
    // // this.state= {value:''};
    // this.handleChange = this.handleChange.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.stateNav = {
      collapsed: true
    };

    
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.stateNav.collapsed
    });
  }
  
  render() {
    return (
      <div className="App">
        <MapContainer></MapContainer>
      </div>
    );
  }
}

export default App;
