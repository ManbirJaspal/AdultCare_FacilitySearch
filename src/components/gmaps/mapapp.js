import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { InfoWindow, Marker,GoogleMap } from 'google-maps-react';
import axios from 'axios';

const mapStyles = {
  width: '28%',
  height: '38%'
};

const lat= [];
const lng = [];

export class MapContainer extends Component {

  state = {
    showingInfoWindow: false,  //Hides or the shows the infoWindow
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {},          //Shows the infoWindow to the selected place upon a marker
  };

  componentDidMount() {
    console.log("inside CDM");

  }

  onMarkerClick = (props, marker, e) =>
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
  });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  renderMarker = () => {
    return this.props.list.map(l => {
      return (
        <Marker
          onClick={this.onMarkerClick}
          name={l.provider_name}
          position={{ lat: l.lat, lng: l.lng }}
        />
    )
  })
}

renll = () => {
  this.setState({ updateState: false});
}

render() {
  return(
    <Map
      google={this.props.google}
      zoom={8}
      style={mapStyles}
      center={{lat:this.props.latt , lng: this.props.lngg } }
    >
      {this.renderMarker()}
      <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow} onClose={this.onClose} >
        <div>
          <h4>{this.state.selectedPlace.name}</h4>
        </div>
      </InfoWindow>
    </Map>
  );
}
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAb_hTLKRbbKd1naMuSYEYYFiQyIYr6XcE'
})(MapContainer);
