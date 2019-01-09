import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
  var google = window.google;
  var  setCord = {
            lat: 0,
            lng: 0
          };

export class MapContainer extends Component {
 async componentDidMount() {
    const { lat, lng } = await this.getcurrentLocation();
    this.setState(prev => ({
      fields: {
        ...prev.fields,
        location: {
          lat,
          lng
        }
      },
      currentLocation: {
        lat,
        lng
      }
    }));
  };

//Get Current location pin map
   getcurrentLocation() {
    if (navigator && navigator.geolocation) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          resolve({
            lat: coords.latitude,
            lng: coords.longitude
          });
        });
      });
    }
    return {
      lat: 0,
      lng: 0
    };
  };

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    fields:{}
  };

  //Based on User addresss set Lat,Lon
  handleChange =(oEvent)=>{
    var address = oEvent.nativeEvent.data || 'Delhi';
    // Initialize the Geocoder
    var geocoder = new google.maps.Geocoder();
    if (geocoder) {
        geocoder.geocode({
            'address': address
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
               this.setState(
                {fields:{
                          lat: results[0].geometry.location.lat(),
                          lng: results[0].geometry.location.lng()}})
            }
        }.bind(this));
      }
  };


//Add marker based on location
  addMarker = (location, map) => {
    this.setState(prev => ({
      fields: {
        ...prev.fields,
        location
      }
    }));
    // map.panTo(location);
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {
    return (
      <div>
      <Navbar dark>
      <input type="text" onChange={this.handleChange} />
      <NavbarBrand>
        Location Finder
      </NavbarBrand>
      </Navbar>
      <Map google={this.props.google} center={this.state.fields.location}
		    style={{width: '100%', height: '100%', position: 'relative'}}
		    className={'map'}
		    zoom={8}>
		  <Marker  onClick={this.onMarkerClick}  position={this.state.fields.location} />
		  <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
      </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyCxFZ9g7WGVoHG58C6YdWZlIbxGok0fRVc")
})(MapContainer)