import { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { Container } from 'react-bootstrap';
import Geocode from "react-geocode";
import configData from './../../config.json';

Geocode.setApiKey(configData.GOOGLE_MAPS_API_KEY);
Geocode.setLanguage("en");
Geocode.enableDebug();

// Geocode.fromLatLng(61.6203291 -149.3941102).then(
//   (response) => {
//     const address = response.results[0].formatted_address;
//     console.log(address);
//   },
//   (error) => {
//     console.error(error);
//   }
// );

Geocode.fromAddress(address()).then(
  (response) => {
    console.log('addr respones', response);
    const { lat, lng } = response.results[0].geometry.location;
    window.lat = lat;
    window.lng = lng;
    window.location_id = response.results[0].place_id;
    window.formated_address = response.results[0].formatted_address;
  },
  (error) => {
    console.log('error', error);
  }
);

const mapStyles = {
  width: '600px',
  height: '400px',
  borderRadius: '10px!important',
  position: 'relative!important',
};

class MapContainer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        address: this.props.address,
        lat: window.lat,
        lng: window.lng,
        place_id: window.location_id,
        formated_address: window.formated_address,
        photos: null,
        showingInfoWindow: false,  // Hides or shows the InfoWindow
        activeMarker: {},          // Shows the active marker upon click
        selectedPlace: {}  
      };
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

    
    render() {
        this.props.changeImageSrc(this.state.address);
        this.props.updateAddress(window.formated_address);
        return (
                <Map
                    id="map"
                    google={this.props.google}
                    zoom={15}
                    className={'map'}   
                    initialCenter={{ lat: this.state.lat, lng: this.state.lng }}
                    ref={this.mapReference}
                    style={mapStyles}
                >
                  <Marker
                  />
                  <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                  >
                    <div>
                      <h4>{this.state.selectedPlace.name}</h4>
                    </div>
                  </InfoWindow>
                </Map>
                
            );
    }
}

function address () {
  const queryParams = new URLSearchParams(window.location.search);
  const address = queryParams.get('propaddress');
  return address;
}

export default GoogleApiWrapper({
    apiKey: configData.GOOGLE_MAPS_API_KEY
})(MapContainer);
