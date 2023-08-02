import React, { Component} from 'react';
import { LocalPicker, GoogleMapsAdapter } from './map/lib2'

class Dropoff extends Component {

  state = {
    value: { lat: 45.8121649, lng: 15.9837788 }
  }

  handleChange = value => {
    this.setState({ value })
    localStorage.setItem('pos2_lat', JSON.stringify(value.lat));
    localStorage.setItem('pos2_lng', JSON.stringify(value.lng));
  }

  render() {
    return (
        <LocalPicker
          adapter={GoogleMapsAdapter}
          value={this.state.value}
          onChange={this.handleChange}
          inputPlaceholder="Enter the full address"
          adapterConfig={{
            map: {
              zoom: 8
            },
            text: {
              loadingText: 'Loading...'
            }
          }}
        />
    );
  }
}

export default Dropoff;
